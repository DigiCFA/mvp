import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Currency from "react-currency-formatter";
import { FontAwesome, Feather } from "@expo/vector-icons";
import BankCardCard from "../../components/cards/BankCardCard";
import { useGetSessionQuery } from "../../redux/api/apiAuthSlice";
import { selectCardsFromUser, selectBalanceFromUser } from "../../redux/api/apiProfileSlice";
import ContentLoader from "react-native-easy-content-loader";
import { Ionicons } from "@expo/vector-icons"
import { useTranslation } from "react-i18next";
import { intlFormat } from "../../utils/currencyFormatter";
import { dinero, toSnapshot } from 'dinero.js';
import { USD } from '@dinero.js/currencies';
const WalletScreen = () => {

  const { t } = useTranslation();

  const {data: session, isLoading, isSuccess, isError, error} = useGetSessionQuery()
  const cards = useSelector(selectCardsFromUser(session.userId))
  const balance = useSelector(selectBalanceFromUser(session.userId))

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row p-4 items-center">
        <TouchableOpacity className="bg-white py-2 px-4 rounded-full">
          <Text className="text-lg font-extrabold text-blueDark">{t('wallet')}</Text>
        </TouchableOpacity>
        <View className="flex-1"></View>
        <TouchableOpacity>
          <Feather name="plus-circle" size={40} color="#3370E2" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View className="p-4 shadow-sm flex-1">
          <TouchableOpacity className='py-3 mb-4 px-4 bg-white rounded-lg flex-row space-x-2 shadow'>
            <Ionicons name="flash" size={40} color="#7152c7"/>
            <View className='flex-row flex-wrap mx-8'>
              <Text className='text-lg font-medium'>
                {t('walletFeature')}
              </Text>
            </View>
          </TouchableOpacity>

          {/* <View className="bg-white h-60 rounded-2xl">
            <View className="flex-col flex-1">
              <View className="flex-row p-4 space-x-4 flex-1">
                <FontAwesome name="paypal" size={30} color="#192C88" />
                <Text className="pt-2 flex-1 text-lg font-semibold">
                  DigiCFA balance
                </Text>
                <Text className="pt-2 text-lg font-semibold">
                  {intlFormat(dinero(balance))}
                </Text>
              </View>
              <Text className="px-4 text-5xl font-bold">
                  {intlFormat(dinero(balance))}
              </Text>
              <View className="flex-1"></View>
            </View>
          </View> */}

          <ContentLoader active pRows={5} title={false} pHeight={250} 
            pWidth={"100%"} loading={!Boolean(cards)}>
            {cards?.map((card, index) => (
              <BankCardCard
                key={card._id}
                index={index}
                name={card.name}
                accountHolder={card.accountHolder}
                cardNumber={card.cardNumber}
                cardType={card.cardType}
                expDate={card.expDate}
                cvv={card.cvv}
              />
            ))}
          </ContentLoader>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletScreen;
