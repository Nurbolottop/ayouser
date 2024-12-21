import React, { useEffect, useState } from "react";
import { Select, Button, message } from "antd";
import editIcon from "../../../../img/Icons.svg";
import "./City.scss";
import Application from "../../../../components/Application/Application";
import useFetchData from "../../../../hooks/useFetchData";
import axios from "axios";

const { Option } = Select;

const City = () => {
  const [city, setCity] = useState("Kyrgyzstan / Osh"); // Initial city state
  const [isEditing, setIsEditing] = useState(false); // Control edit mode
  const { data } = useFetchData("https://ayo.webtm.ru/api/v1/organization/organization/city/");
  const { data: user } = useFetchData(`https://ayo.webtm.ru/api/v1/users/users/${localStorage.getItem('user_id')}/`);

  // Start editing mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Save the selected city
  const handleSave = async () => {
    try {
      await axios.patch(`https://ayo.webtm.ru/api/v1/users/users/${localStorage.getItem('user_id')}/`, {
        city,
      });
      message.success("City updated successfully!");
      setIsEditing(false);
    } catch (error) {
      message.error("Failed to update city");
      console.error(error);
    }
  };

  // Handle city selection change
  const handleCityChange = (value: any) => {
    const selectedCity = data.find((city: any) => city.id === value);
    setCity(selectedCity || {}); // Set the entire city object
  };

  return (
    <div className="city">
      <h2 className="data__title">My City</h2>
      <form className="city__form">
        <div className="city__form-input">
          {isEditing ? (
            <Select
              onChange={handleCityChange}
              placeholder="Select a city"
              style={{ width: "100%", border: 'none !important' }}
              size="large"
            >
              {data.map((city: any) => (
                <Option key={city.id} value={city.id}>
                  {city.title}/{city.country}
                </Option>
              ))}
            </Select>
          ) : (
            <p>{user.city?.title}/{user.city?.country}</p>
          )}
          <Button
            type="text"
            icon={<img src={editIcon} alt="edit" />}
            onClick={isEditing ? handleSave : handleEdit}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>
      </form>
      <div className="city__results">
        <p className="city__results-text">{user.city?.title}/{user.city?.country}</p>
      </div>
      <Button type="primary" className="data__save" size="large" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default City;
