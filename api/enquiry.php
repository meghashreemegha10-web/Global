<?php
/**
 * Global Mahanshi Builders & Architects
 * Lead & Site Enquiry Intake Handler
 * Hostinger Production Hardened API
 */

// 1. Production Error Suppression (Prevents internal file path disclosure)
ini_set('display_errors', '0');
error_reporting(0);

// 2. Strict Security Headers
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Permissions-Policy: camera=(), microphone=(), geolocation=()');

// 3. Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

// 4. Origin & CSRF Validation
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : (isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '');
if (!empty($origin)) {
    $parsedHost = strtolower(parse_url($origin, PHP_URL_HOST));
    $allowedHosts = [
        'localhost',
        '127.0.0.1',
        'globalmahanshibuilders.com',
        'www.globalmahanshibuilders.com'
    ];
    $isAllowed = in_array($parsedHost, $allowedHosts) ||
                 str_ends_with($parsedHost, '.trycloudflare.com') ||
                 str_ends_with($parsedHost, '.vercel.app');
    if (!$isAllowed) {
        http_response_code(403);
        echo json_encode(['success' => false, 'error' => 'Cross-Origin Request Blocked']);
        exit;
    }
}

// 5. Rate Limiting (Max 15 submissions per minute per IP)
$clientIp = isset($_SERVER['REMOTE_ADDR']) ? preg_replace('/[^0-9a-fA-F:.]/', '', $_SERVER['REMOTE_ADDR']) : '127.0.0.1';
$rateDir = sys_get_temp_dir() . '/gm_ratelimit';
if (!is_dir($rateDir)) {
    @mkdir($rateDir, 0700, true);
}
$rateFile = $rateDir . '/rate_' . md5($clientIp) . '.json';
$rateData = ['count' => 0, 'time' => time()];
if (file_exists($rateFile)) {
    $saved = @json_decode(@file_get_contents($rateFile), true);
    if (is_array($saved) && (time() - $saved['time'] < 60)) {
        $rateData = $saved;
    }
}
$rateData['count']++;
@file_put_contents($rateFile, json_encode($rateData), LOCK_EX);

if ($rateData['count'] > 15) {
    http_response_code(429);
    header('Retry-After: 60');
    echo json_encode(['success' => false, 'error' => 'Too Many Requests. Please wait a minute.']);
    exit;
}

// 6. Max Payload Ceiling (100 KB limit to prevent memory DoS)
$rawInput = file_get_contents('php://input');
if (strlen($rawInput) > 102400) {
    http_response_code(413);
    echo json_encode(['success' => false, 'error' => 'Payload Too Large']);
    exit;
}

$data = json_decode($rawInput, true);
if (!is_array($data)) {
    $data = $_POST;
}

// 3. Extract and sanitize fields
$name     = isset($data['name'])     ? trim(strip_tags((string)$data['name'])) : '';
$mobile   = isset($data['mobile'])   ? trim(strip_tags((string)$data['mobile'])) : '';
$interest = isset($data['interest']) ? trim(strip_tags((string)$data['interest'])) : 'General Enquiry';
$visit    = isset($data['visit'])    ? trim(strip_tags((string)$data['visit'])) : 'Not specified';
$message  = isset($data['message'])  ? trim(strip_tags((string)$data['message'])) : '';

// 4. Validate mandatory fields
if (empty($name) || empty($mobile)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Name and mobile number are required.']);
    exit;
}

// Mobile format validation (must contain at least 7 digits)
$cleanMobile = preg_replace('/[^\d+]/', '', $mobile);
if (strlen($cleanMobile) < 7 || strlen($cleanMobile) > 16) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please provide a valid contact number.']);
    exit;
}

// 5. Construct lead record
$leadRecord = [
    'id'        => 'LEAD-' . date('Ymd') . '-' . substr(bin2hex(random_bytes(4)), 0, 6),
    'name'      => mb_substr($name, 0, 100),
    'mobile'    => $cleanMobile,
    'interest'  => mb_substr($interest, 0, 120),
    'visit'     => mb_substr($visit, 0, 60),
    'message'   => mb_substr($message, 0, 1000),
    'source'    => isset($data['source']) ? mb_substr(strip_tags((string)$data['source']), 0, 100) : 'Website',
    'timestamp' => date('Y-m-d H:i:s T'),
    'user_ip'   => isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'unknown'
];

// 6. Safely store to data/leads.json
$leadsFile = __DIR__ . '/../data/leads.json';
$leadsDir = dirname($leadsFile);

if (!is_dir($leadsDir)) {
    @mkdir($leadsDir, 0750, true);
}

$leads = [];
if (file_exists($leadsFile)) {
    $existing = @file_get_contents($leadsFile);
    $decoded = @json_decode($existing, true);
    if (is_array($decoded)) {
        $leads = $decoded;
    }
}

// Prepend newest lead first
array_unshift($leads, $leadRecord);

// Keep maximum 5000 leads in JSON archive
if (count($leads) > 5000) {
    $leads = array_slice($leads, 0, 5000);
}

file_put_contents($leadsFile, json_encode($leads, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);

// 7. Optional Email Notification to Support Desk
$toEmail = 'support@globalmahanshibuilders.com';
$subject = "New Plot / Project Enquiry: " . $leadRecord['name'] . " (" . $leadRecord['mobile'] . ")";
$bodyText = "New enquiry received via Global Mahanshi Builders website:\n\n"
          . "Lead ID:    " . $leadRecord['id'] . "\n"
          . "Name:       " . $leadRecord['name'] . "\n"
          . "Mobile:     " . $leadRecord['mobile'] . "\n"
          . "Project:    " . $leadRecord['interest'] . "\n"
          . "Visit:      " . $leadRecord['visit'] . "\n"
          . "Message:    " . $leadRecord['message'] . "\n"
          . "Timestamp:  " . $leadRecord['timestamp'] . "\n";

$headers = "From: noreply@globalmahanshibuilders.com\r\n"
         . "Reply-To: " . $leadRecord['mobile'] . "\r\n"
         . "X-Mailer: PHP/" . phpversion();

// Attempt mail send quietly (will work if Hostinger mail service is active)
@mail($toEmail, $subject, $bodyText, $headers);

// 8. Return success
echo json_encode([
    'success' => true,
    'message' => 'Thank you! Your enquiry has been securely received by our project team.',
    'lead_id' => $leadRecord['id']
]);
