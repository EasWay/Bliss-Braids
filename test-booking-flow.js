/**
 * Integration Test Script for Bliss Braids Booking Flow
 * 
 * This script validates the booking flow logic without requiring a browser.
 * It tests price calculations, duration calculations, and data validation.
 */

// Import validation schema
const { z } = require('zod');

// Test data
const services = [
  {
    id: 'knotless-braids',
    name: 'Knotless Braids',
    baseDuration: 4,
    basePrice: 150,
    sizeVariants: {
      small: { priceMultiplier: 1.5, timeMultiplier: 1.5 },
      medium: { priceMultiplier: 1.0, timeMultiplier: 1.0 },
      jumbo: { priceMultiplier: 0.8, timeMultiplier: 0.6 }
    },
    lengthVariants: {
      shoulder: { priceAdd: 0 },
      midBack: { priceAdd: 40 },
      waist: { priceAdd: 70 },
      butt: { priceAdd: 100 }
    }
  },
  {
    id: 'box-braids',
    name: 'Box Braids',
    baseDuration: 4,
    basePrice: 120,
    sizeVariants: {
      small: { priceMultiplier: 1.5, timeMultiplier: 1.5 },
      medium: { priceMultiplier: 1.0, timeMultiplier: 1.0 },
      jumbo: { priceMultiplier: 0.8, timeMultiplier: 0.6 }
    },
    lengthVariants: {
      shoulder: { priceAdd: 0 },
      midBack: { priceAdd: 40 },
      waist: { priceAdd: 70 },
      butt: { priceAdd: 100 }
    }
  },
  {
    id: 'cornrows',
    name: 'Cornrows',
    baseDuration: 2,
    basePrice: 80,
    sizeVariants: {
      small: { priceMultiplier: 1.5, timeMultiplier: 1.5 },
      medium: { priceMultiplier: 1.0, timeMultiplier: 1.0 },
      jumbo: { priceMultiplier: 0.8, timeMultiplier: 0.6 }
    },
    lengthVariants: {
      shoulder: { priceAdd: 0 },
      midBack: { priceAdd: 30 },
      waist: { priceAdd: 50 },
      butt: { priceAdd: 70 }
    }
  }
];

const addOns = [
  { id: 'boho-curls', name: 'Boho Curls', price: 20 },
  { id: 'beads', name: 'Decorative Beads', price: 10 },
  { id: 'edge-control', name: 'Premium Edge Control', price: 15 }
];

// Price calculation function
function calculateTotal(service, size, length, selectedAddOns = []) {
  let total = service.basePrice;
  total += service.lengthVariants[length].priceAdd;
  total = total * service.sizeVariants[size].priceMultiplier;
  selectedAddOns.forEach(addOn => {
    total += addOn.price;
  });
  return Math.round(total);
}

// Duration calculation function
function calculateDuration(service, size) {
  return Math.round(service.baseDuration * service.sizeVariants[size].timeMultiplier * 10) / 10;
}

// Validation schema
const BookingSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  whatsappNumber: z.string().regex(/^233\d{9}$/, 'Invalid Ghana WhatsApp number'),
  email: z.string().email('Invalid email address'),
  serviceName: z.string(),
  size: z.enum(['small', 'medium', 'jumbo']),
  length: z.enum(['shoulder', 'midBack', 'waist', 'butt']),
  date: z.string(),
  time: z.string(),
  totalPrice: z.number(),
  estimatedDuration: z.number()
});

// Test cases
const testCases = [
  {
    name: 'Knotless Braids - Small - Shoulder',
    service: services[0],
    size: 'small',
    length: 'shoulder',
    addOns: [],
    expectedPrice: 225, // 150 * 1.5
    expectedDuration: 6 // 4 * 1.5
  },
  {
    name: 'Knotless Braids - Medium - Mid-Back',
    service: services[0],
    size: 'medium',
    length: 'midBack',
    addOns: [],
    expectedPrice: 190, // (150 + 40) * 1.0
    expectedDuration: 4 // 4 * 1.0
  },
  {
    name: 'Knotless Braids - Jumbo - Waist',
    service: services[0],
    size: 'jumbo',
    length: 'waist',
    addOns: [],
    expectedPrice: 176, // (150 + 70) * 0.8
    expectedDuration: 2.4 // 4 * 0.6
  },
  {
    name: 'Box Braids - Small - Butt',
    service: services[1],
    size: 'small',
    length: 'butt',
    addOns: [],
    expectedPrice: 330, // (120 + 100) * 1.5
    expectedDuration: 6 // 4 * 1.5
  },
  {
    name: 'Cornrows - Medium - Shoulder',
    service: services[2],
    size: 'medium',
    length: 'shoulder',
    addOns: [],
    expectedPrice: 80, // 80 * 1.0
    expectedDuration: 2 // 2 * 1.0
  },
  {
    name: 'Knotless Braids - Medium - Mid-Back with Boho Curls',
    service: services[0],
    size: 'medium',
    length: 'midBack',
    addOns: [addOns[0]], // Boho Curls +20
    expectedPrice: 210, // (150 + 40) * 1.0 + 20
    expectedDuration: 4
  },
  {
    name: 'Box Braids - Jumbo - Waist with All Add-ons',
    service: services[1],
    size: 'jumbo',
    length: 'waist',
    addOns: addOns, // +20 +10 +15 = +45
    expectedPrice: 197, // (120 + 70) * 0.8 + 45 = 152 + 45
    expectedDuration: 2.4
  }
];

// Validation test cases
const validationTests = [
  {
    name: 'Valid booking data',
    data: {
      customerName: 'John Doe',
      whatsappNumber: '233247173819',
      email: 'john@example.com',
      serviceName: 'Knotless Braids',
      size: 'medium',
      length: 'midBack',
      date: '2025-12-01',
      time: '10:00 AM',
      totalPrice: 190,
      estimatedDuration: 4
    },
    shouldPass: true
  },
  {
    name: 'Invalid WhatsApp number (too short)',
    data: {
      customerName: 'John Doe',
      whatsappNumber: '23324717381',
      email: 'john@example.com',
      serviceName: 'Knotless Braids',
      size: 'medium',
      length: 'midBack',
      date: '2025-12-01',
      time: '10:00 AM',
      totalPrice: 190,
      estimatedDuration: 4
    },
    shouldPass: false
  },
  {
    name: 'Invalid email format',
    data: {
      customerName: 'John Doe',
      whatsappNumber: '233247173819',
      email: 'invalid-email',
      serviceName: 'Knotless Braids',
      size: 'medium',
      length: 'midBack',
      date: '2025-12-01',
      time: '10:00 AM',
      totalPrice: 190,
      estimatedDuration: 4
    },
    shouldPass: false
  },
  {
    name: 'Name too short',
    data: {
      customerName: 'J',
      whatsappNumber: '233247173819',
      email: 'john@example.com',
      serviceName: 'Knotless Braids',
      size: 'medium',
      length: 'midBack',
      date: '2025-12-01',
      time: '10:00 AM',
      totalPrice: 190,
      estimatedDuration: 4
    },
    shouldPass: false
  }
];

// Run tests
console.log('🧪 Bliss Braids - Integration Test Suite\n');
console.log('=' .repeat(60));

// Price calculation tests
console.log('\n📊 PRICE CALCULATION TESTS\n');
let passedPriceTests = 0;
let failedPriceTests = 0;

testCases.forEach((test, index) => {
  const calculatedPrice = calculateTotal(test.service, test.size, test.length, test.addOns);
  const calculatedDuration = calculateDuration(test.service, test.size);
  
  const priceMatch = calculatedPrice === test.expectedPrice;
  const durationMatch = calculatedDuration === test.expectedDuration;
  
  if (priceMatch && durationMatch) {
    console.log(`✅ Test ${index + 1}: ${test.name}`);
    console.log(`   Price: ${calculatedPrice} GHS (Expected: ${test.expectedPrice})`);
    console.log(`   Duration: ${calculatedDuration}h (Expected: ${test.expectedDuration}h)\n`);
    passedPriceTests++;
  } else {
    console.log(`❌ Test ${index + 1}: ${test.name}`);
    if (!priceMatch) {
      console.log(`   Price MISMATCH: ${calculatedPrice} GHS (Expected: ${test.expectedPrice})`);
    }
    if (!durationMatch) {
      console.log(`   Duration MISMATCH: ${calculatedDuration}h (Expected: ${test.expectedDuration}h)`);
    }
    console.log('');
    failedPriceTests++;
  }
});

// Validation tests
console.log('=' .repeat(60));
console.log('\n🔒 VALIDATION TESTS\n');
let passedValidationTests = 0;
let failedValidationTests = 0;

validationTests.forEach((test, index) => {
  try {
    BookingSchema.parse(test.data);
    if (test.shouldPass) {
      console.log(`✅ Test ${index + 1}: ${test.name}`);
      console.log(`   Validation passed as expected\n`);
      passedValidationTests++;
    } else {
      console.log(`❌ Test ${index + 1}: ${test.name}`);
      console.log(`   Expected validation to FAIL but it PASSED\n`);
      failedValidationTests++;
    }
  } catch (error) {
    if (!test.shouldPass) {
      console.log(`✅ Test ${index + 1}: ${test.name}`);
      const errorMsg = error.errors && error.errors[0] ? error.errors[0].message : error.message;
      console.log(`   Validation failed as expected: ${errorMsg}\n`);
      passedValidationTests++;
    } else {
      console.log(`❌ Test ${index + 1}: ${test.name}`);
      const errorMsg = error.errors && error.errors[0] ? error.errors[0].message : error.message;
      console.log(`   Expected validation to PASS but it FAILED: ${errorMsg}\n`);
      failedValidationTests++;
    }
  }
});

// Environment variable tests
console.log('=' .repeat(60));
console.log('\n🔧 ENVIRONMENT VARIABLE TESTS\n');

const requiredEnvVars = [
  'RESEND_API_KEY',
  'OWNER_EMAIL',
  'NEXT_PUBLIC_OWNER_WHATSAPP'
];

let envVarsPassed = 0;
let envVarsFailed = 0;

// Load .env.local
const fs = require('fs');
const path = require('path');

try {
  const envPath = path.join(__dirname, '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  requiredEnvVars.forEach(varName => {
    if (envContent.includes(varName)) {
      const match = envContent.match(new RegExp(`${varName}=(.+)`));
      if (match && match[1].trim() && !match[1].includes('your_')) {
        console.log(`✅ ${varName} is configured`);
        envVarsPassed++;
      } else {
        console.log(`❌ ${varName} is present but not configured (placeholder value)`);
        envVarsFailed++;
      }
    } else {
      console.log(`❌ ${varName} is missing`);
      envVarsFailed++;
    }
  });
} catch (error) {
  console.log(`❌ Could not read .env.local file: ${error.message}`);
  envVarsFailed = requiredEnvVars.length;
}

// Summary
console.log('\n' + '=' .repeat(60));
console.log('\n📈 TEST SUMMARY\n');
console.log(`Price Calculation Tests: ${passedPriceTests}/${testCases.length} passed`);
console.log(`Validation Tests: ${passedValidationTests}/${validationTests.length} passed`);
console.log(`Environment Variables: ${envVarsPassed}/${requiredEnvVars.length} configured`);

const totalTests = testCases.length + validationTests.length + requiredEnvVars.length;
const totalPassed = passedPriceTests + passedValidationTests + envVarsPassed;
const totalFailed = failedPriceTests + failedValidationTests + envVarsFailed;

console.log(`\nTotal: ${totalPassed}/${totalTests} tests passed`);

if (totalFailed === 0) {
  console.log('\n🎉 All tests passed! Ready for deployment.\n');
  process.exit(0);
} else {
  console.log(`\n⚠️  ${totalFailed} test(s) failed. Please review and fix.\n`);
  process.exit(1);
}
