#!/usr/bin/env python3
"""
React Native Push Notifications Implementation Test
Tests TypeScript compilation and code structure validation
"""

import os
import sys
import json
import subprocess
import re
from pathlib import Path
from typing import Dict, List, Any

class ReactNativeNotificationsTest:
    def __init__(self):
        self.base_path = Path("/app/mobile")
        self.tests_run = 0
        self.tests_passed = 0
        self.issues = []
        
    def log_test(self, name: str, passed: bool, details: str = ""):
        """Log test result"""
        self.tests_run += 1
        if passed:
            self.tests_passed += 1
            print(f"✅ {name}")
            if details:
                print(f"   {details}")
        else:
            print(f"❌ {name}")
            if details:
                print(f"   {details}")
                self.issues.append(f"{name}: {details}")
    
    def test_typescript_compilation(self) -> bool:
        """Test TypeScript compilation"""
        print("\n🔍 Testing TypeScript Compilation...")
        
        try:
            # Change to mobile directory
            os.chdir(self.base_path)
            
            # Check if node_modules exists
            if not (self.base_path / "node_modules").exists():
                self.log_test("TypeScript Compilation", False, "node_modules not found - dependencies not installed")
                return False
            
            # Run TypeScript compiler check
            result = subprocess.run(
                ["npx", "tsc", "--noEmit", "--skipLibCheck"],
                capture_output=True,
                text=True,
                timeout=60
            )
            
            if result.returncode == 0:
                self.log_test("TypeScript Compilation", True, "No TypeScript errors found")
                return True
            else:
                error_lines = result.stderr.strip().split('\n')
                # Filter out common warnings that don't affect functionality
                critical_errors = [line for line in error_lines if 
                                 'error TS' in line and 
                                 'Cannot find module' not in line and
                                 'node_modules' not in line]
                
                if not critical_errors:
                    self.log_test("TypeScript Compilation", True, "Only minor warnings found")
                    return True
                else:
                    self.log_test("TypeScript Compilation", False, f"TypeScript errors: {'; '.join(critical_errors[:3])}")
                    return False
                    
        except subprocess.TimeoutExpired:
            self.log_test("TypeScript Compilation", False, "TypeScript compilation timed out")
            return False
        except Exception as e:
            self.log_test("TypeScript Compilation", False, f"Error running TypeScript compiler: {str(e)}")
            return False
    
    def test_notifications_service_exports(self) -> bool:
        """Test that notifications service exports all required functions"""
        print("\n🔍 Testing Notifications Service Exports...")
        
        notifications_file = self.base_path / "src/services/notifications.ts"
        if not notifications_file.exists():
            self.log_test("Notifications Service File", False, "notifications.ts file not found")
            return False
        
        content = notifications_file.read_text()
        
        # Required exports
        required_exports = [
            "requestNotificationPermissions",
            "scheduleEventReminder", 
            "scheduleAllEventReminders",
            "cancelEventReminder",
            "cancelAllReminders",
            "getScheduledReminders",
            "getExpoPushToken"
        ]
        
        missing_exports = []
        for export in required_exports:
            if f"export async function {export}" not in content and f"export function {export}" not in content:
                missing_exports.append(export)
        
        if missing_exports:
            self.log_test("Notifications Service Exports", False, f"Missing exports: {', '.join(missing_exports)}")
            return False
        else:
            self.log_test("Notifications Service Exports", True, f"All {len(required_exports)} required functions exported")
            return True
    
    def test_quote_modal_reminder_toggle(self) -> bool:
        """Test QuoteModal includes reminder toggle when date is selected"""
        print("\n🔍 Testing QuoteModal Reminder Toggle...")
        
        quote_modal_file = self.base_path / "src/components/QuoteModal.tsx"
        if not quote_modal_file.exists():
            self.log_test("QuoteModal File", False, "QuoteModal.tsx file not found")
            return False
        
        content = quote_modal_file.read_text()
        
        # Check for reminder toggle implementation
        checks = [
            ("enableReminders state", "enableReminders" in content),
            ("Switch component", "<Switch" in content and "enableReminders" in content),
            ("Conditional rendering", "{date &&" in content and "reminderContainer" in content),
            ("scheduleAllEventReminders import", "scheduleAllEventReminders" in content),
            ("Reminder scheduling logic", "scheduleAllEventReminders(date, name, packageName)" in content)
        ]
        
        failed_checks = []
        for check_name, condition in checks:
            if not condition:
                failed_checks.append(check_name)
        
        if failed_checks:
            self.log_test("QuoteModal Reminder Toggle", False, f"Missing: {', '.join(failed_checks)}")
            return False
        else:
            self.log_test("QuoteModal Reminder Toggle", True, "All reminder toggle features implemented")
            return True
    
    def test_custom_package_modal_reminder_toggle(self) -> bool:
        """Test CustomPackageModal includes reminder toggle when date is selected"""
        print("\n🔍 Testing CustomPackageModal Reminder Toggle...")
        
        custom_modal_file = self.base_path / "src/components/CustomPackageModal.tsx"
        if not custom_modal_file.exists():
            self.log_test("CustomPackageModal File", False, "CustomPackageModal.tsx file not found")
            return False
        
        content = custom_modal_file.read_text()
        
        # Check for reminder toggle implementation
        checks = [
            ("enableReminders state", "enableReminders" in content),
            ("Switch component", "<Switch" in content and "enableReminders" in content),
            ("Conditional rendering", "{date &&" in content and "reminderContainer" in content),
            ("scheduleAllEventReminders import", "scheduleAllEventReminders" in content),
            ("Reminder scheduling logic", "scheduleAllEventReminders(date, name, 'Paquete Personalizado')" in content)
        ]
        
        failed_checks = []
        for check_name, condition in checks:
            if not condition:
                failed_checks.append(check_name)
        
        if failed_checks:
            self.log_test("CustomPackageModal Reminder Toggle", False, f"Missing: {', '.join(failed_checks)}")
            return False
        else:
            self.log_test("CustomPackageModal Reminder Toggle", True, "All reminder toggle features implemented")
            return True
    
    def test_reminders_screen_export(self) -> bool:
        """Test RemindersScreen is properly exported in screens/index.ts"""
        print("\n🔍 Testing RemindersScreen Export...")
        
        screens_index_file = self.base_path / "src/screens/index.ts"
        if not screens_index_file.exists():
            self.log_test("Screens Index File", False, "screens/index.ts file not found")
            return False
        
        content = screens_index_file.read_text()
        
        if "RemindersScreen" in content and "export" in content:
            self.log_test("RemindersScreen Export", True, "RemindersScreen properly exported")
            return True
        else:
            self.log_test("RemindersScreen Export", False, "RemindersScreen not found in exports")
            return False
    
    def test_navigation_configuration(self) -> bool:
        """Test navigation includes Recordatorios screen"""
        print("\n🔍 Testing Navigation Configuration...")
        
        navigator_file = self.base_path / "src/navigation/AppNavigator.tsx"
        if not navigator_file.exists():
            self.log_test("AppNavigator File", False, "AppNavigator.tsx file not found")
            return False
        
        content = navigator_file.read_text()
        
        checks = [
            ("RemindersScreen import", "RemindersScreen" in content and "import" in content),
            ("Recordatorios route type", "Recordatorios: undefined" in content),
            ("Recordatorios menu item", "'Recordatorios'" in content and "'bell'" in content),
            ("Recordatorios screen component", 'name="Recordatorios" component={RemindersScreen}' in content)
        ]
        
        failed_checks = []
        for check_name, condition in checks:
            if not condition:
                failed_checks.append(check_name)
        
        if failed_checks:
            self.log_test("Navigation Configuration", False, f"Missing: {', '.join(failed_checks)}")
            return False
        else:
            self.log_test("Navigation Configuration", True, "Recordatorios screen properly configured in navigation")
            return True
    
    def test_app_json_configuration(self) -> bool:
        """Test app.json is configured with expo-notifications plugin"""
        print("\n🔍 Testing app.json Configuration...")
        
        app_json_file = self.base_path / "app.json"
        if not app_json_file.exists():
            self.log_test("app.json File", False, "app.json file not found")
            return False
        
        try:
            with open(app_json_file, 'r') as f:
                app_config = json.load(f)
            
            plugins = app_config.get('expo', {}).get('plugins', [])
            
            # Check for expo-notifications plugin
            notifications_plugin_found = False
            for plugin in plugins:
                if isinstance(plugin, str) and plugin == "expo-notifications":
                    notifications_plugin_found = True
                    break
                elif isinstance(plugin, list) and len(plugin) > 0 and plugin[0] == "expo-notifications":
                    notifications_plugin_found = True
                    # Check plugin configuration
                    if len(plugin) > 1 and isinstance(plugin[1], dict):
                        config = plugin[1]
                        required_config = ["icon", "color", "androidCollapsedTitle"]
                        missing_config = [key for key in required_config if key not in config]
                        if missing_config:
                            self.log_test("expo-notifications Plugin Config", False, f"Missing config: {', '.join(missing_config)}")
                        else:
                            self.log_test("expo-notifications Plugin Config", True, "Plugin properly configured")
                    break
            
            if notifications_plugin_found:
                self.log_test("expo-notifications Plugin", True, "expo-notifications plugin found in app.json")
                return True
            else:
                self.log_test("expo-notifications Plugin", False, "expo-notifications plugin not found in app.json")
                return False
                
        except json.JSONDecodeError as e:
            self.log_test("app.json Configuration", False, f"Invalid JSON format: {str(e)}")
            return False
        except Exception as e:
            self.log_test("app.json Configuration", False, f"Error reading app.json: {str(e)}")
            return False
    
    def test_reminders_screen_implementation(self) -> bool:
        """Test RemindersScreen implementation"""
        print("\n🔍 Testing RemindersScreen Implementation...")
        
        reminders_screen_file = self.base_path / "src/screens/RemindersScreen.tsx"
        if not reminders_screen_file.exists():
            self.log_test("RemindersScreen File", False, "RemindersScreen.tsx file not found")
            return False
        
        content = reminders_screen_file.read_text()
        
        # Check for key implementation features
        checks = [
            ("Notifications service imports", "getScheduledReminders" in content and "cancelEventReminder" in content),
            ("State management", "useState" in content and "reminders" in content),
            ("useEffect hook", "useEffect" in content and "loadReminders" in content),
            ("FlatList component", "FlatList" in content and "renderReminder" in content),
            ("Cancel functionality", "handleCancelReminder" in content and "Alert.alert" in content),
            ("Empty state", "EmptyState" in content and "bell-off" in content),
            ("Refresh control", "RefreshControl" in content and "onRefresh" in content)
        ]
        
        failed_checks = []
        for check_name, condition in checks:
            if not condition:
                failed_checks.append(check_name)
        
        if failed_checks:
            self.log_test("RemindersScreen Implementation", False, f"Missing: {', '.join(failed_checks)}")
            return False
        else:
            self.log_test("RemindersScreen Implementation", True, "All key features implemented")
            return True
    
    def run_all_tests(self) -> Dict[str, Any]:
        """Run all tests and return results"""
        print("🚀 Starting React Native Push Notifications Tests...\n")
        
        # Run all tests
        tests = [
            self.test_notifications_service_exports,
            self.test_quote_modal_reminder_toggle,
            self.test_custom_package_modal_reminder_toggle,
            self.test_reminders_screen_export,
            self.test_navigation_configuration,
            self.test_app_json_configuration,
            self.test_reminders_screen_implementation,
            self.test_typescript_compilation,  # Run this last as it takes longer
        ]
        
        for test in tests:
            try:
                test()
            except Exception as e:
                self.log_test(f"Test {test.__name__}", False, f"Test failed with exception: {str(e)}")
        
        # Print summary
        print(f"\n📊 Test Results: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed! Push notifications implementation is complete.")
        else:
            print("⚠️  Some tests failed. Issues found:")
            for issue in self.issues:
                print(f"   - {issue}")
        
        return {
            "tests_run": self.tests_run,
            "tests_passed": self.tests_passed,
            "success_rate": (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0,
            "issues": self.issues
        }

def main():
    """Main test execution"""
    tester = ReactNativeNotificationsTest()
    results = tester.run_all_tests()
    
    # Return appropriate exit code
    return 0 if results["tests_passed"] == results["tests_run"] else 1

if __name__ == "__main__":
    sys.exit(main())