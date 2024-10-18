import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from './src/screens/HomePage';
import CommissionTrackingPage from './src/pages/payment/CommissionTrackingPage';
import ContactUsPage from './src/pages/about_company/ContactUsPage';
import FAQPage from './src/pages/about_company/FAQPage';
import FacileGoldSchemePage from './src/pages/about_company/FacileGoldSchemePage';
import PrivacyPolicyPage from './src/pages/about_company/PrivacyPolicyPage';
import TermsAndConditionsPage from './src/pages/about_company/TermsAndConditionsPage';
import CancellationPolicyPage from './src/pages/about_company/CancellationPolicyPage';
import ExchangePolicyPage from './src/pages/about_company/ExchangePolicyPage';
import RefundPolicyPage from './src/pages/about_company/RefundPolicyPage';
import ShippingPolicyPage from './src/pages/about_company/ShippingPolicyPage';
import BuybackPolicyPage from './src/pages/about_company/BuybackPolicyPage';
import BankCashbackPolicyPage from './src/pages/about_company/BankCashbackPolicyPage';
import GoldenGlorySchemePage from './src/pages/about_company/GoldenGlorySchemePage';
import AboutUsPage from './src/pages/about_company/AboutUsPage';
import CategoriesPage from './src/pages/features/CategoriesPage';
import VendorDashboardPage from './src/pages/vendor/VendorDashboardPage';
import VendorManagementPage from './src/pages/vendor/VendorMangementPage';
import AddVendorPage from './src/pages/vendor/AddVendorPage';
import NewArrivalsPage from './src/pages/vendor/NewArrivalsPage';
import OnSalePage from './src/pages/vendor/OnSalePage';
import ProductDetailPage from './src/pages/product/ProductDetailPage';
import ProductListingPage from './src/pages/product/ProductListingPage';
import AddProductPage from './src/pages/product/AddProductPage';
import EditProductPage from './src/pages/product/EditProductPage';
import ProductViewPage from './src/pages/product/ProductViewPage';
import ProductListingAllPage from './src/pages/product/ProductListingAllPage';
import ProductListingSearchPage from './src/pages/product/ProductListingSearchPage';
import WishlistPage from './src/pages/customer/WishlistPage';
import ProfilePage from './src/pages/customer/ProfilePage';
import EmailVerificationPage from './src/pages/customer/EmailVerificationPage';
import TrackOrderPage from './src/pages/customer/TrackOrderPage';
import OrderHistoryPage from './src/pages/customer/OrderHistoryPage';
import BecomeVendorScreen from './src/pages/customer/BecomeVendorScreen';
import LoyaltyProgramPage from './src/pages/customer/LoyaltyProgramPage';
import CheckoutPage from './src/pages/customer/CheckoutPage';
import ShippingAddressPage from './src/pages/customer/ShippingAddressPage';
import ShippingAddressBuyPage from './src/pages/customer/ShippingAddressBuyPage';
import CartPage from './src/pages/customer/CartPage';
import AgentListPage from './src/pages/agent/AgentListPage';
import TerritoryHeadListPage from './src/pages/agent/TerritoryHeadListPage';
import FranchiseListPage from './src/pages/agent/FranchiseListPage';
import AgentDashboardPage from './src/pages/agent/AgentDashboardPage';
import TerritoryHeadDashboardPage from './src/pages/agent/TerritoryHeadDashboardPage';
import FranchiseDashboardPage from './src/pages/agent/FranchiseDashboardPage';
import CustomerBecomeAVendorListPage from './src/pages/agent/CustomerBecomeAVendorListPage';
import SpecialCollectionPage from './src/pages/features/SpecialCollectionPage';
import CollectionDetailPage from './src/pages/features/CollectionDetailPage';
import HomePageBBS from './src/pages/HomePageBBS';
import PaymentPage from './src/pages/payment/PaymentPage';
import CategoryCard from './src/components/CategoryCard';
import CommissionCard from './src/components/CommissionCard';
import DashboardCard from './src/components/DashboardCard';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="HomePageBBS">

        <Drawer.Screen name="ProductDetailPage" component={ProductDetailPage} />
        <Drawer.Screen name="ProductListingPage" component={ProductListingPage} />
        <Drawer.Screen name="ProductListingSearchPage" component={ProductListingSearchPage} />
        <Drawer.Screen name="ProductListingAllPage" component={ProductListingAllPage} />
        <Drawer.Screen name="EditProductPage" component={EditProductPage} />
        <Drawer.Screen name="AddProductPage" component={AddProductPage} />
        <Drawer.Screen name="ProductViewPage" component={ProductViewPage} />
  
        <Drawer.Screen name="OnSalePage" component={OnSalePage} />
        <Drawer.Screen name="NewArrivalsPage" component={NewArrivalsPage} />
        <Drawer.Screen name="AddVendorPage" component={AddVendorPage} />
        <Drawer.Screen name="VendorDashboardPage" component={VendorDashboardPage} />
        <Drawer.Screen name="VendorManagementPage" component={VendorManagementPage} />

        <Drawer.Screen name="HomePage" component={HomePage} />
        <Drawer.Screen name="HomePageBBS" component={HomePageBBS} />

        <Drawer.Screen name="AgentListPage" component={AgentListPage} />
        <Drawer.Screen name="TerritoryHeadListPage" component={TerritoryHeadListPage} />
        <Drawer.Screen name="FranchiseListPage" component={FranchiseListPage} />
        <Drawer.Screen name="AgentDashboardPage" component={AgentDashboardPage} />
        <Drawer.Screen name="TerritoryHeadDashboardPage" component={TerritoryHeadDashboardPage} />
        <Drawer.Screen name="FranchiseDashboardPage" component={FranchiseDashboardPage} />
        <Drawer.Screen name="CustomerBecomeAVendorListPage" component={CustomerBecomeAVendorListPage} />

        <Drawer.Screen name="LoyaltyProgramPage" component={LoyaltyProgramPage} />
        <Drawer.Screen name="CheckoutPage" component={CheckoutPage} />
        <Drawer.Screen name="ShippingAddressPage" component={ShippingAddressPage} />
        <Drawer.Screen name="ShippingAddressBuyPage" component={ShippingAddressBuyPage} />
        <Drawer.Screen name="WishlistPage" component={WishlistPage} />
        <Drawer.Screen name="CartPage" component={CartPage} />
        <Drawer.Screen name="ProfilePage" component={ProfilePage} />
        <Drawer.Screen name="EmailVerificationPage" component={EmailVerificationPage} />
        <Drawer.Screen name="TrackOrderPage" component={TrackOrderPage} />
        <Drawer.Screen name="OrderHistoryPage" component={OrderHistoryPage} />
        <Drawer.Screen name="BecomeVendorScreen" component={BecomeVendorScreen} />

        <Drawer.Screen name="CategoriesPage" component={CategoriesPage} />
        <Drawer.Screen name="SpecialCollectionPage" component={SpecialCollectionPage} />
        <Drawer.Screen name="CollectionDetailPage" component={CollectionDetailPage} />


        <Drawer.Screen name="CommissionTrackingPage" component={CommissionTrackingPage} />
        <Drawer.Screen name="PaymentPage" component={PaymentPage} />

        <Drawer.Screen name="AboutUsPage" component={AboutUsPage} />
        <Drawer.Screen name="GoldenGlorySchemePage" component={GoldenGlorySchemePage} />
        <Drawer.Screen name="BankCashbackPolicyPage" component={BankCashbackPolicyPage} />
        <Drawer.Screen name="ShippingPolicyPage" component={ShippingPolicyPage} />
        <Drawer.Screen name="RefundPolicyPage" component={RefundPolicyPage} />
        <Drawer.Screen name="ExchangePolicyPage" component={ExchangePolicyPage} />
        <Drawer.Screen name="CancellationPolicyPage" component={CancellationPolicyPage} />
        <Drawer.Screen name="TermsAndConditionsPage" component={TermsAndConditionsPage} />
        <Drawer.Screen name="PrivacyPolicyPage" component={PrivacyPolicyPage} />
        <Drawer.Screen name="FacileGoldSchemePage" component={FacileGoldSchemePage} />
        <Drawer.Screen name="FAQPage" component={FAQPage} />
        <Drawer.Screen name="ContactUsPage" component={ContactUsPage} />
        <Drawer.Screen name="BuybackPolicyPage" component={BuybackPolicyPage} />
        

      </Drawer.Navigator>
    </NavigationContainer>
  );
}
