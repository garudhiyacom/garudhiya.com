<?php
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Rewrite Check</title>
    <style>
        body { font-family: monospace; padding: 20px; background: #f5f5f5; }
        .info { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .success { color: green; }
        .error { color: red; }
        h2 { color: #333; }
    </style>
</head>
<body>
    <h1>Server Configuration Check</h1>
    
    <div class="info">
        <h2>Request Information</h2>
        <p><strong>REQUEST_URI:</strong> <?php echo $_SERVER['REQUEST_URI'] ?? 'Not set'; ?></p>
        <p><strong>QUERY_STRING:</strong> <?php echo $_SERVER['QUERY_STRING'] ?? 'Empty'; ?></p>
        <p><strong>SCRIPT_NAME:</strong> <?php echo $_SERVER['SCRIPT_NAME'] ?? 'Not set'; ?></p>
        <p><strong>PHP_SELF:</strong> <?php echo $_SERVER['PHP_SELF'] ?? 'Not set'; ?></p>
    </div>
    
    <div class="info">
        <h2>GET Parameters</h2>
        <?php if (empty($_GET)): ?>
            <p>No GET parameters</p>
        <?php else: ?>
            <?php foreach ($_GET as $key => $value): ?>
                <p><strong><?php echo htmlspecialchars($key); ?>:</strong> <?php echo htmlspecialchars($value); ?></p>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>
    
    <div class="info">
        <h2>Apache Modules</h2>
        <?php if (function_exists('apache_get_modules')): ?>
            <?php $modules = apache_get_modules(); ?>
            <p class="<?php echo in_array('mod_rewrite', $modules) ? 'success' : 'error'; ?>">
                mod_rewrite: <?php echo in_array('mod_rewrite', $modules) ? '✓ ENABLED' : '✗ DISABLED'; ?>
            </p>
        <?php else: ?>
            <p>Cannot check modules (not running as Apache module or function disabled)</p>
        <?php endif; ?>
    </div>
    
    <div class="info">
        <h2>Test Links</h2>
        <p><a href="/blog/test123">Test: /blog/test123</a></p>
        <p><a href="/check-rewrite.php?id=test123">Direct: /check-rewrite.php?id=test123</a></p>
    </div>
</body>
</html>
