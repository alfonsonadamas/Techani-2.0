import React, { useEffect } from "react";
import axios from "axios";

export default function Food() {
  const secret = "6abc77c997634a24ab9633695b85c1c5";
  const clientID = "6dbd3238637a4c479d9723c01bd807e3";
  const getFood = async () => {
    try {
      const response = await axios.post(
        "https://oauth.fatsecret.com/connect/token",
        {
          auth: {
            user: clientID,
            password: secret,
          },
          headers: {
            accept: "application/json",
            Autorization: "Bearer 6dbd3238637a4c479d9723c01bd807e3",
            Parameters: "method=food.get.v2&food_id=33691&format=json",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFood();
  }, []);
  return <div></div>;
}
