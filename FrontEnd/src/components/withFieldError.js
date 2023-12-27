import { View, Text } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const withFieldError = (WrappedComponent) => {
  return ({
    isDisplayChecklist = false,
    isDisplayError,
    onChangeText,
    onIsErrorChange,
    validator,
    ...props
  }) => {
    /*
        The errorStates should be of structure:
        {
            errMsg1: true,
            errMsg2: false,
            ...
            errMsg3: true,
        }
        The value of a key is set to true is the corresponding errMsg should be displayed
        */

    const [errorStates, setErrorStates] = useState(validator(""));
    const [isError, setIsError] = useState(
      Object.keys(validator("")).reduce((prev, key) => {
        prev = prev || validator("")[key];
        return prev;
      }, false)
    );

    const handleOnChangeText = (text) => {
      const res = validator(text);
      setErrorStates(res);
      setIsError(
        Object.keys(res).reduce((prev, key) => {
          prev = prev || res[key];
          return prev;
        }, false)
      );
      onIsErrorChange(
        Object.keys(res).reduce((prev, key) => {
          prev = prev || res[key];
          return prev;
        }, false)
      );
      onChangeText(text);
    };

    const getErrorListsComponents = (errorList) => {
      return (Object.keys(errorList)).map((key, idx) => {
        const errorItemOpacity = ((!isDisplayError || !errorList[key]) && !isDisplayChecklist) ? "opacity-0" : "opacity-1"
        return (
          <View className={`flex-row justify-start items-center space-x-1 mt-1 ${errorItemOpacity}`} key={idx}>
            {(errorList[key] || !isDisplayChecklist) ? (
              <FontAwesome5 name="exclamation" size={24} color="red" />
            ) : (
              <FontAwesome name="check" size={24} color="green" />
            )}
            <Text className={(errorList[key] ? "text-red-600" : "text-green-600") +
              " font-bold pl-1"}>
              {key}
            </Text>
          </View>
        )
      })
    }

    return (
      <View>
        <WrappedComponent
          onChangeText={handleOnChangeText}
          isError={isError && isDisplayError}
          {...props}
        />
        <View className="flex-col">{getErrorListsComponents(errorStates)}</View>
        <View className="flex-col">{getErrorListsComponents(errorStates)}</View>
      </View>
    );
  };
};

export default withFieldError;
