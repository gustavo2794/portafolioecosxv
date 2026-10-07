#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class ReactNativeProjectTester {
  constructor() {
    this.projectPath = '/app/mobile';
    this.tests_run = 0;
    this.tests_passed = 0;
    this.issues = [];
  }

  log(message) {
    console.log(message);
  }

  runTest(name, testFn) {
    this.tests_run++;
    this.log(`\n🔍 Testing ${name}...`);
    
    try {
      const result = testFn();
      if (result === true || result === undefined) {
        this.tests_passed++;
        this.log(`✅ Passed - ${name}`);
        return true;
      } else {
        this.log(`❌ Failed - ${name}: ${result}`);
        this.issues.push(`${name}: ${result}`);
        return false;
      }
    } catch (error) {
      this.log(`❌ Failed - ${name}: ${error.message}`);
      this.issues.push(`${name}: ${error.message}`);
      return false;
    }
  }

  fileExists(filePath) {
    return fs.existsSync(path.join(this.projectPath, filePath));
  }

  readJsonFile(filePath) {
    try {
      const fullPath = path.join(this.projectPath, filePath);
      return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    } catch (error) {
      throw new Error(`Cannot read ${filePath}: ${error.message}`);
    }
  }

  readFile(filePath) {
    try {
      const fullPath = path.join(this.projectPath, filePath);
      return fs.readFileSync(fullPath, 'utf8');
    } catch (error) {
      throw new Error(`Cannot read ${filePath}: ${error.message}`);
    }
  }

  testProjectStructure() {
    return this.runTest('Project Structure', () => {
      const requiredFiles = [
        'App.tsx',
        'package.json',
        'app.json',
        'index.ts',
        'tsconfig.json',
        'src/screens/HomeScreen.tsx',
        'src/screens/ProjectsScreen.tsx',
        'src/screens/PackagesScreen.tsx',
        'src/screens/GalleryScreen.tsx',
        'src/screens/index.ts',
        'src/navigation/AppNavigator.tsx',
        'src/components/CustomPackageModal.tsx',
        'src/components/Button.tsx',
        'src/components/Card.tsx',
        'src/components/QuoteModal.tsx',
        'src/components/WhatsAppFAB.tsx',
        'src/constants/data.ts',
        'src/constants/theme.ts',
        'src/utils/whatsapp.ts'
      ];

      const missingFiles = requiredFiles.filter(file => !this.fileExists(file));
      
      if (missingFiles.length > 0) {
        return `Missing files: ${missingFiles.join(', ')}`;
      }
      
      return true;
    });
  }

  testPackageJson() {
    return this.runTest('Package.json Configuration', () => {
      const packageJson = this.readJsonFile('package.json');
      
      const requiredDeps = [
        '@expo-google-fonts/playfair-display',
        '@expo-google-fonts/pt-sans',
        '@react-navigation/drawer',
        '@react-navigation/native',
        'expo',
        'expo-font',
        'expo-splash-screen',
        'react',
        'react-native',
        'react-native-gesture-handler',
        'react-native-reanimated',
        'react-native-safe-area-context',
        'react-native-screens',
        'react-native-webview'
      ];

      const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);
      
      if (missingDeps.length > 0) {
        return `Missing dependencies: ${missingDeps.join(', ')}`;
      }

      // Check scripts
      if (!packageJson.scripts || !packageJson.scripts.start) {
        return 'Missing start script';
      }

      return true;
    });
  }

  testAppJson() {
    return this.runTest('Expo Configuration (app.json)', () => {
      const appJson = this.readJsonFile('app.json');
      
      if (!appJson.expo) {
        return 'Missing expo configuration';
      }

      const expo = appJson.expo;
      const requiredFields = ['name', 'slug', 'version', 'orientation', 'icon'];
      const missingFields = requiredFields.filter(field => !expo[field]);
      
      if (missingFields.length > 0) {
        return `Missing expo fields: ${missingFields.join(', ')}`;
      }

      // Check if assets exist
      const assetFiles = ['./assets/icon.png', './assets/splash-icon.png'];
      const missingAssets = assetFiles.filter(asset => !this.fileExists(asset.replace('./', '')));
      
      if (missingAssets.length > 0) {
        return `Missing asset files: ${missingAssets.join(', ')}`;
      }

      return true;
    });
  }

  testScreenExports() {
    return this.runTest('Screen Exports', () => {
      const indexContent = this.readFile('src/screens/index.ts');
      const expectedExports = ['HomeScreen', 'ProjectsScreen', 'PackagesScreen', 'GalleryScreen'];
      
      const missingExports = expectedExports.filter(exp => !indexContent.includes(exp));
      
      if (missingExports.length > 0) {
        return `Missing screen exports: ${missingExports.join(', ')}`;
      }

      return true;
    });
  }

  testDataConstants() {
    return this.runTest('Data Constants', () => {
      const dataContent = this.readFile('src/constants/data.ts');
      
      const requiredExports = [
        'WHATSAPP_NUMBER',
        'LOGO_FULL',
        'LOGO_ICON',
        'HERO_BACKGROUND',
        'projects',
        'packages',
        'galleryImages',
        'customPackageFeatures'
      ];

      const missingExports = requiredExports.filter(exp => !dataContent.includes(`export const ${exp}`) && !dataContent.includes(`export { ${exp}`));
      
      if (missingExports.length > 0) {
        return `Missing data exports: ${missingExports.join(', ')}`;
      }

      // Check if projects array has content
      if (!dataContent.includes('project-') || !dataContent.includes('youtubeVideoId')) {
        return 'Projects data appears incomplete';
      }

      // Check if packages array has content
      if (!dataContent.includes('Paquete Básico') || !dataContent.includes('features:')) {
        return 'Packages data appears incomplete';
      }

      // Check if gallery images have content
      if (!dataContent.includes('galleryImages:') || !dataContent.includes('imageUrl')) {
        return 'Gallery images data appears incomplete';
      }

      return true;
    });
  }

  testThemeConstants() {
    return this.runTest('Theme Constants', () => {
      const themeContent = this.readFile('src/constants/theme.ts');
      
      const requiredExports = ['Colors', 'Fonts', 'Spacing', 'BorderRadius'];
      const missingExports = requiredExports.filter(exp => !themeContent.includes(`export const ${exp}`));
      
      if (missingExports.length > 0) {
        return `Missing theme exports: ${missingExports.join(', ')}`;
      }

      // Check for Playfair Display and PT Sans fonts
      if (!themeContent.includes('PlayfairDisplay') || !themeContent.includes('PTSans')) {
        return 'Missing required font definitions';
      }

      return true;
    });
  }

  testComponentImports() {
    return this.runTest('Component Import Structure', () => {
      const appContent = this.readFile('App.tsx');
      
      // Check main app imports
      if (!appContent.includes("from './src/navigation/AppNavigator'")) {
        return 'App.tsx missing AppNavigator import';
      }

      if (!appContent.includes("from './src/constants/theme'")) {
        return 'App.tsx missing theme import';
      }

      // Check navigation imports
      const navContent = this.readFile('src/navigation/AppNavigator.tsx');
      if (!navContent.includes("from '../screens'")) {
        return 'AppNavigator missing screens import';
      }

      return true;
    });
  }

  testWhatsAppIntegration() {
    return this.runTest('WhatsApp Integration', () => {
      const whatsappContent = this.readFile('src/utils/whatsapp.ts');
      
      if (!whatsappContent.includes('openWhatsApp') || !whatsappContent.includes('buildPackageQuoteMessage')) {
        return 'Missing WhatsApp utility functions';
      }

      if (!whatsappContent.includes('wa.me') || !whatsappContent.includes('WHATSAPP_NUMBER')) {
        return 'WhatsApp integration appears incomplete';
      }

      return true;
    });
  }

  runAllTests() {
    this.log('🚀 Starting React Native Project Structure Tests...\n');
    
    this.testProjectStructure();
    this.testPackageJson();
    this.testAppJson();
    this.testScreenExports();
    this.testDataConstants();
    this.testThemeConstants();
    this.testComponentImports();
    this.testWhatsAppIntegration();

    this.log(`\n📊 Test Results: ${this.tests_passed}/${this.tests_run} tests passed`);
    
    if (this.issues.length > 0) {
      this.log('\n❌ Issues found:');
      this.issues.forEach(issue => this.log(`  - ${issue}`));
      return 1;
    } else {
      this.log('\n✅ All tests passed! Project structure is complete and valid.');
      return 0;
    }
  }
}

// Run the tests
const tester = new ReactNativeProjectTester();
const exitCode = tester.runAllTests();
process.exit(exitCode);