import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class TestStuff(unittest.TestCase):

    def test_10emptypassword(self):

        #Testar tomt lösenord

        driver.refresh()

        inp = driver.find_element_by_id("register-username")
        inp.send_keys("testuser")
        driver.find_element_by_id("register-button").click()

        elem = driver.find_element_by_class_name("error-message")
        
        self.assertEqual(elem.text, "! Fyll i alla fält")

    def test_11emptyusername(self):

        #Testar tomt användarnamn

        driver.refresh()

        inp = driver.find_element_by_id("register-password")
        inp.send_keys("testpassword")
        driver.find_element_by_id("register-button").click()

        elem = driver.find_element_by_class_name("error-message")
        
        self.assertEqual(elem.text, "! Fyll i alla fält")



    def test_12invalidcharacter(self):

        #Testar tomt användarnamn

        driver.refresh()

        inp = driver.find_element_by_id("register-username")
        inp.send_keys("testuser!")
        inp = driver.find_element_by_id("register-password")
        inp.send_keys("testpassword")
        driver.find_element_by_id("register-button").click()

        elem = driver.find_element_by_class_name("error-message")
        
        self.assertEqual(elem.text, "Användarnamnet får bara innehålla tecknena a-ö0-9")

    def test_13registeruser(self):

        #Testar registering av rätt användare

        driver.refresh()

        inp = driver.find_element_by_id("register-username")
        inp.send_keys("testuser")
        inp = driver.find_element_by_id("register-password")
        inp.send_keys("testpassword")
        driver.find_element_by_id("register-button").click()

        elem = driver.find_element_by_class_name("registered-message")
        
        self.assertEqual(elem.text, "Användaren tillagd!")

    def test_14registerfriend(self):

        #Testar registering av rätt användare

        driver.refresh()

        inp = driver.find_element_by_id("register-username")
        inp.send_keys("testfriend")
        inp = driver.find_element_by_id("register-password")
        inp.send_keys("123")
        driver.find_element_by_id("register-button").click()

        elem = driver.find_element_by_class_name("registered-message")
        
        self.assertEqual(elem.text, "Användaren tillagd!")
    
    def test_15duplicateuser(self):

        #Testar registering när användarnamn redan finns

        driver.refresh()

        inp = driver.find_element_by_id("register-username")
        inp.send_keys("testuser")
        np = driver.find_element_by_id("register-password")
        np.send_keys("testpassword")
        driver.find_element_by_id("register-button").click()

        elem = driver.find_element_by_class_name("error-message")
        
        self.assertEqual(elem.text, "Användarnamnet finns redan")

    def test_20emptypassword(self):

        #Testar tomt lösenord

        driver.refresh()

        inp = driver.find_element_by_id("login-username")
        inp.send_keys("testuser")
        driver.find_element_by_id("login-button").click()

        elem = driver.find_element_by_class_name("error-message")
        
        self.assertEqual(elem.text, "! Fyll i alla fält")
  
    def test_21emptyusername(self):

        #Testar tomt användarnamn

        driver.refresh()

        inp = driver.find_element_by_id("login-password")
        inp.send_keys("testpassword")
        driver.find_element_by_id("login-button").click()

        elem = driver.find_element_by_class_name("error-message")
        
        self.assertEqual(elem.text, "! Fyll i alla fält")

    def test_22wrongpassword(self):

        #Testar tomt användarnamn

        driver.refresh()

        inp = driver.find_element_by_id("login-username")
        inp.send_keys("testuser")

        inp = driver.find_element_by_id("login-password")
        inp.send_keys("wrongpassword")
        driver.find_element_by_id("login-button").click()

        elem = driver.find_element_by_class_name("error-message")
        self.assertEqual(elem.text, "Fel användarnamn eller lösenord")
    
    def test_23wrongusername(self):
      
        #Testar tomt användarnamn

        driver.refresh()

        inp = driver.find_element_by_id("login-username")
        inp.send_keys("wronguser")

        inp = driver.find_element_by_id("login-password")
        inp.send_keys("password")
        driver.find_element_by_id("login-button").click()

        elem = driver.find_element_by_class_name("error-message")
        
        self.assertEqual(elem.text, "Fel användarnamn eller lösenord")
    

    def test_24login(self):
        """
        Testar tomt användarnamn
        """
        driver.refresh()

        inp = driver.find_element_by_id("login-username")
        inp.send_keys("testuser")

        inp = driver.find_element_by_id("login-password")
        inp.send_keys("testpassword")
        driver.find_element_by_id("login-button").click()

        elem = driver.find_element_by_id("greet")
        
        self.assertEqual(elem.text, "Hello testuser")

    def test_998refreshpage(self):

        #Testar tomt användarnamn

        driver.find_element_by_link_text('Home').click()

        driver.refresh()

        self.assertTrue('testuser' in driver.page_source)

    def test_30checkemptymessages(self):
        """
        Testar tomt användarnamn
        """
        self.assertTrue('testuser has no messages (o´ω`o)' in driver.page_source)

    def test_30checknofriends(self):
        """
        Testar tomt användarnamn
        """
        self.assertTrue('testuser has no friends UwU' in driver.page_source)


    def test_31checkmessages(self):
        """
        Testar tomt användarnamn
        """

        inp = driver.find_element_by_id("comment")
        inp.send_keys("Welcome to my page")
        driver.find_element_by_id("submit-comment").click()
        self.assertTrue('Welcome to my page' in driver.page_source)

    def test_40missingsearch(self):
        """
        Testar tomt användarnamn
        """

        driver.find_element_by_link_text('Search').click()
        inp = driver.find_element_by_id("searchfield")
        inp.send_keys("nope")
        driver.find_element_by_id("search-button").click()
    
        self.assertTrue('No users found (/)(;,,;)(/)' in driver.page_source)

    def test_41checksearch(self):
        """
        Testar tomt användarnamn
        """
        driver.refresh()

        driver.find_element_by_link_text('Search').click()
        inp = driver.find_element_by_id("searchfield")
        inp.send_keys("test")
        driver.find_element_by_id("search-button").click()
    
        self.assertTrue('testuser' in driver.page_source)
        self.assertTrue('testfriend' in driver.page_source)

    def test_50checkuserlink(self):
        """
        Testar tomt användarnamn
        """

        driver.find_element_by_link_text('testfriend').click()
        
        elem = driver.find_element_by_id("current-page")
        
        self.assertEqual(elem.text, "testfriend")

    def test_51checkfriendmessages(self):
        """
        Testar tomt användarnamn
        """

        inp = driver.find_element_by_id("comment")
        inp.send_keys("Hello friend")
        driver.find_element_by_id("submit-comment").click()
        self.assertTrue('Hello friend' in driver.page_source)

    def test_52addfriend(self):
        """
        Testar tomt användarnamn
        """
        driver.find_element_by_id("add").click()

        driver.find_element_by_link_text('Home').click()
        
        self.assertTrue('testfriend' in driver.page_source)

    def test_999logout(self):
        
        #Testar tomt användarnamn

        driver.find_element_by_link_text('Log out').click()
        
        inp = driver.find_element_by_id("app")

        self.assertTrue('Login' in driver.page_source)

if __name__ == '__main__':
    driver = webdriver.Firefox()
    driver.get("http://localhost:4242/clear/")
    driver.get("http://localhost:8080/#/")

    unittest.main()
    driver.quit()