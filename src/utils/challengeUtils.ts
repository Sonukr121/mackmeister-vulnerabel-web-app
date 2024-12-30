import { Challenge } from '../types/challenge';

// Enhanced validation patterns
const sqlInjectionPatterns = [
  "'OR'1'='1",
  "' OR '1'='1",
  "admin'--",
  "1' OR '1' = '1",
  "1 OR 1=1",
  "' OR 1=1--",
  "' OR '1'='1'--",
  "UNION SELECT",
  "DROP TABLE",
  "DELETE FROM",
  // Additional patterns
  "SELECT *",
  "OR 1=1",
  "' OR TRUE--",
  "'; DROP TABLE",
  "UNION ALL SELECT"
];

const xssPatterns = [
  "<script>",
  "javascript:",
  "onerror=",
  "onload=",
  "onclick=",
  "alert(",
  "<img src=x",
  "onmouseover=",
  "<svg onload=",
  "document.cookie",
  // Additional patterns
  "<img onerror=",
  "eval(",
  "setTimeout(",
  "document.write(",
  "<iframe src="
];

const commandInjectionPatterns = [
  ";",
  "&&",
  "||",
  "|",
  "`",
  "$(",
  "ls",
  "dir",
  "cat",
  "pwd",
  "whoami",
  "netstat",
  "/etc/passwd",
  // Additional patterns
  "curl",
  "wget",
  "nc",
  "bash",
  "python -c"
];

const noSQLPatterns = [
  "$where",
  "$ne",
  "$gt",
  "$lt",
  "$regex",
  "$in",
  "{$ne:",
  "{$gt:",
  "$or",
  "$and",
  "$exists",
  // Additional patterns
  "$elemMatch",
  "$text",
  "$search",
  "$all",
  "$size"
];

const pathTraversalPatterns = [
  "../",
  "..\\",
  "%2e%2e%2f",
  "..;/",
  "..../",
  "....\\",
  "/etc/",
  "c:\\windows",
  // Additional patterns
  "file://",
  "..%2f",
  "%252e%252e%252f",
  "....//",
  "%c0%ae%c0%ae/"
];

// Enhanced validation functions
export const validateSQLInjection = (input: string): boolean => {
  return sqlInjectionPatterns.some(pattern => 
    input.toLowerCase().includes(pattern.toLowerCase())
  );
};

export const validateXSS = (input: string): boolean => {
  return xssPatterns.some(pattern => 
    input.toLowerCase().includes(pattern.toLowerCase())
  );
};

export const validateCommandInjection = (input: string): boolean => {
  return commandInjectionPatterns.some(pattern => 
    input.toLowerCase().includes(pattern.toLowerCase())
  );
};

export const validateNoSQLInjection = (input: string): boolean => {
  return noSQLPatterns.some(pattern => 
    input.toLowerCase().includes(pattern.toLowerCase())
  );
};

export const validatePathTraversal = (input: string): boolean => {
  return pathTraversalPatterns.some(pattern => 
    input.toLowerCase().includes(pattern.toLowerCase())
  );
};

export const validateCSRF = (token: string): boolean => {
  return !token || token === "null" || token === "undefined" || token.length < 10;
};

export const validateInsecureDeserialization = (input: string): boolean => {
  try {
    const obj = JSON.parse(input);
    return (
      obj.hasOwnProperty("constructor") || 
      obj.hasOwnProperty("prototype") || 
      obj.hasOwnProperty("__proto__") ||
      input.includes("rce") ||
      input.includes("exec")
    );
  } catch {
    return false;
  }
};

export const validateSecurityMisconfig = (input: string): boolean => {
  const misconfigPatterns = [
    "debug=true",
    "test=true",
    "dev=true",
    "admin=true",
    "config.php",
    ".env",
    "web.config",
    ".git",
    "phpinfo",
    "admin_panel",
    "setup.php",
    "install.php"
  ];
  return misconfigPatterns.some(pattern => 
    input.toLowerCase().includes(pattern.toLowerCase())
  );
};

export const validateClientSideBypass = (input: any): boolean => {
  const numValue = Number(input);
  return (
    isNaN(numValue) ||
    !Number.isInteger(numValue) ||
    numValue < 0 ||
    numValue > 1000000 ||
    input.toString().includes("e")
  );
};

export const checkChallenge = (
  challengeId: number,
  input: string,
  completeChallenge: (id: number) => void
): void => {
  let isCompleted = false;

  switch (challengeId) {
    case 1: // Command Injection
      isCompleted = validateCommandInjection(input);
      break;
    case 2: // SQL Injection Login
      isCompleted = validateSQLInjection(input);
      break;
    case 3: // Stored XSS
      isCompleted = validateXSS(input);
      break;
    case 4: // IDOR
      isCompleted = /admin|root|system/.test(input) || input === "1";
      break;
    case 5: // Information Disclosure
      isCompleted = input.includes("ADMIN100") || input.includes("SECRET_KEY");
      break;
    case 6: // DOM-based XSS
      isCompleted = validateXSS(input);
      break;
    case 7: // NoSQL Injection
      isCompleted = validateNoSQLInjection(input);
      break;
    case 8: // Broken Access Control
      isCompleted = input === "debug=true" || input.includes("admin=true");
      break;
    case 9: // Sensitive Data Exposure
      isCompleted = input.includes("password") || input.includes("secret");
      break;
    case 10: // Broken Authentication
      isCompleted = validateSQLInjection(input) || input === "admin' --";
      break;
    case 11: // Path Traversal
      isCompleted = validatePathTraversal(input);
      break;
    case 12: // CSRF
      isCompleted = validateCSRF(input);
      break;
    case 13: // Insecure Deserialization
      isCompleted = validateInsecureDeserialization(input);
      break;
    case 14: // Security Misconfiguration
      isCompleted = validateSecurityMisconfig(input);
      break;
    case 15: // Client-Side Validation Bypass
      isCompleted = validateClientSideBypass(input);
      break;
  }

  if (isCompleted) {
    completeChallenge(challengeId);
  }
};