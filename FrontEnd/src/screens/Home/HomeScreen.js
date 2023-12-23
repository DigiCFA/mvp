import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import TransactionCard from "../../components/cards/TransactionCard";
import { selectBalanceFromUser, useFetchTransactionsQuery, useFetchUserQuery } from "../../redux/api/apiProfileSlice";
import { useGetSessionQuery } from "../../redux/api/apiAuthSlice";
import ContentLoader, { Bullets } from "react-native-easy-content-loader";
import Currency from "react-currency-formatter";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";


const HomeScreen = () => {

  const { t } = useTranslation();

  const navigation = useNavigation();
  const {
    data: session,
    isSuccess: getSessionIsSuccess,
    isLoading: getSessionIsLoading,
  } = useGetSessionQuery();
  const {
    data: transactions,
    isSuccess: fetchTransactionIsSuccess,
    isLoading: fetchTransactionIsLoading,
  } = useFetchTransactionsQuery(session.userId, { skip: !getSessionIsSuccess });

  const {
    data: user,
    isSuccess: fetchUserIsSuccess,
    isLoading: fetchUserIsLoading
  } = useFetchUserQuery(session.userId, {skip: !getSessionIsSuccess});

  const balance = useSelector(selectBalanceFromUser(session.userId))

  return (
    <SafeAreaView className="bg-beige flex-1">
      <ScrollView>
        {/* Header */}
        <View className="flex-row px-4 pb-6 space-x-3 self-end">
          <TouchableOpacity
            onPress={() => navigation.navigate("Scan")}
            className="p-1.5 rounded-full bg-white"
          >
            <Ionicons name="qr-code" size={40} color="#192C88" />
          </TouchableOpacity>
        </View>

        <View className="px-4 pb-4 space-y-3">

          {/* User Balance */}
          <ContentLoader
            title={false}
            pHeight={24}
            pWidth={"100%"}
            listSize={1}
            loading={fetchUserIsLoading}>
            <View className="py-3 px-4 bg-white rounded-lg flex-col space-x-4 shadow">
              <Text className="text-xl text-gray-400 self-center">{t('balance')}</Text>
              <View className='flex-row flex-wrap justify-center'>
                <Text className='text-2xl font-bold self-center'>CFA {balance?.toString().split('.')[0]}</Text>
                <Text className='text-2xl font-bold self-center text-gray-600'>.{balance?.toString().split('.')[1]}</Text>
              </View>
            </View>
          </ContentLoader>

          {/* Card View */}
          {/* <View className="bg-white h-60 rounded-2xl">
            <View className="flex-col flex-1">
              <View className="flex-row p-4 space-x-4 flex-1">
                <FontAwesome name="paypal" size={30} color="#192C88" />
                <Text className="pt-2 flex-1 text-lg font-semibold">
                  DigiCFA balance
                </Text>
                <Text className="pt-2 text-lg font-semibold">
                  XAF
                </Text>
              </View>
              <Text className="px-4 text-5xl font-bold">
                F.CFA {balance}
              </Text>
              <View className="flex-1"></View>
            </View>
          </View> */}

          {/* <TouchableOpacity className="mr-7 py-3 pl-4 pr-8 bg-white rounded-lg flex-row space-x-4 shadow">
            <FontAwesome name="cc-paypal" size={40} color="#192C88" />
            <View>
              <Text className="text-xl font-semibold">
                Apply for the PayPal Cashback Mastercard
              </Text>
              <Text className="">Terms apply.</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="close" size={30} color="black" />
            </TouchableOpacity>
          </TouchableOpacity> */}
        </View>

        {/* Transactions */}

        <View className="bg-white mt-2 py-6 px-4 flex-1">
          <Text className="text-xl text-gray-800 pb-2">{t('recentActivity')}</Text>

          <ContentLoader
            active
            title={false}
            pHeight={48}
            pWidth={"100%"}
            listSize={10}
            loading={fetchTransactionIsLoading}
          >
            {transactions?.slice(0).reverse().map((transaction) => (
              <TransactionCard
                key={transaction._id}
                id={transaction._id}
                userPays={transaction.sender._id === session.userId}
                title={
                  transaction.sender._id === session.userId
                    ? transaction.receiver.fullName
                    : transaction.sender.fullName
                }
                date={transaction.transactionDate}
                message={transaction.message}
                paymentMethod={transaction.paymentMethod}
                amount={transaction.amountTransferred}
              />
            ))}
          </ContentLoader>

          {/* <TransactionsColumn /> */}

          <TouchableOpacity className="pt-4">
            <Text className="text-center text-lg font-bold text-blue-600">
              {t('showAll')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
