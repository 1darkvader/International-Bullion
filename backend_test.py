import requests
import sys
import json
from datetime import datetime

class RockBullionAPITester:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:100]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}")

            self.test_results.append({
                "test": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_preview": response.text[:100] if not success else "OK"
            })

            return success, response.json() if success and response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                "test": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "response_preview": str(e)
            })
            return False, {}

    def test_health_check(self):
        """Test health endpoint"""
        success, response = self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200
        )
        return success

    def test_get_products(self):
        """Test get products endpoint"""
        success, response = self.run_test(
            "Get Products",
            "GET",
            "api/products",
            200
        )
        if success and 'products' in response:
            products = response['products']
            print(f"   Found {len(products)} products")
            if len(products) == 4:
                print("   ✅ Correct number of products (4)")
                # Check if all required products exist
                product_names = [p['name'] for p in products]
                expected_products = ["1 Gram Gold Bar", "100 Gram Gold Bar", "1 Kilogram Gold Bar", "400 oz Good Delivery Bar"]
                for expected in expected_products:
                    if expected in product_names:
                        print(f"   ✅ Found: {expected}")
                    else:
                        print(f"   ❌ Missing: {expected}")
            else:
                print(f"   ❌ Expected 4 products, found {len(products)}")
        return success

    def test_spot_price(self):
        """Test spot price endpoint"""
        success, response = self.run_test(
            "Get Spot Price",
            "GET",
            "api/spot-price",
            200
        )
        if success:
            if 'gold_price_usd' in response:
                print(f"   Gold Price: ${response['gold_price_usd']}")
                print("   ✅ Spot price data structure correct")
            else:
                print("   ❌ Missing gold_price_usd in response")
        return success

    def test_create_lead(self):
        """Test create lead endpoint"""
        test_lead = {
            "full_name": "John Test Smith",
            "email": "john.test@example.com",
            "phone": "+1 555 123 4567",
            "country": "United States",
            "consultation_method": "phone",
            "message": "I am interested in purchasing gold bars for investment purposes."
        }
        
        success, response = self.run_test(
            "Create Lead",
            "POST",
            "api/leads",
            200,
            data=test_lead
        )
        
        if success:
            if 'id' in response and 'message' in response:
                print(f"   Lead ID: {response['id']}")
                print(f"   Message: {response['message']}")
                print("   ✅ Lead creation response structure correct")
                return response['id']
            else:
                print("   ❌ Missing id or message in response")
        return None

    def test_get_leads(self):
        """Test get leads endpoint"""
        success, response = self.run_test(
            "Get Leads",
            "GET",
            "api/leads",
            200
        )
        if success and 'leads' in response:
            leads_count = len(response['leads'])
            print(f"   Found {leads_count} leads in database")
            print("   ✅ Leads retrieval working")
        return success

def main():
    print("🚀 Starting Rock International Bullion API Tests")
    print("=" * 60)
    
    # Setup
    tester = RockBullionAPITester("http://localhost:8001")
    
    # Run all tests
    print("\n📋 Running Backend API Tests...")
    
    # Test 1: Health Check
    tester.test_health_check()
    
    # Test 2: Get Products
    tester.test_get_products()
    
    # Test 3: Get Spot Price
    tester.test_spot_price()
    
    # Test 4: Create Lead
    lead_id = tester.test_create_lead()
    
    # Test 5: Get Leads
    tester.test_get_leads()
    
    # Print final results
    print("\n" + "=" * 60)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed! Backend API is working correctly.")
        return 0
    else:
        print("⚠️  Some tests failed. Check the details above.")
        print("\nFailed Tests:")
        for result in tester.test_results:
            if not result['success']:
                print(f"  - {result['test']}: {result['response_preview']}")
        return 1

if __name__ == "__main__":
    sys.exit(main())