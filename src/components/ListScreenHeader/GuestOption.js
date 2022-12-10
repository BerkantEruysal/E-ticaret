import React, { useState, useEffect, useRef } from "react";
import { IoIosMan } from "react-icons/io";
import { useOutsideAlerter } from "../../Hooks";
import { GetResourceByValue, GetSettingByValue } from "../DynamicSelectors";

const GuestOption = (props) => {
  const [roomCount, setRoomCount] = useState(1);
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

  const [childrenAges, setChildrenAges] = useState([]);
  const [childElements, setChildElements] = useState([]);
  useEffect(() => {
    const tempList = [];
    for (let i = 0; i < childCount; i++) {
      tempList.push(
        <div
          key={i}
          className="d-flex align-items-center justify-content-around"
        >
          <p className="m-0">
            {GetResourceByValue("common.child")} {i + 1}
          </p>
          <select
            defaultValue="default"
            className="form-select w-50"
            onChange={({ target }) => {
              const temp = [...childrenAges];
              temp[i] = target.value;
              setChildrenAges(temp);
            }}
            name={`child ${i}`}
            id={`child ${i}`}
          >
            <option value="default" disabled hidden>
              {GetResourceByValue("common.age")}
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
          </select>
        </div>
      );
    }
    setChildElements(tempList);
  }, [childrenAges]);

  function handleChildCountIncrement() {
    setChildCount(childCount + 1);
    setChildrenAges([...childrenAges, 0]);
  }
  function handleChildCountDecrement() {
    setChildCount(childCount - 1);
    const tempList = [...childrenAges];
    tempList.pop();
    setChildrenAges(tempList);
  }

  const optionRef = useRef(null);
  useOutsideAlerter(optionRef, () => {
    setIsSelected(false);
  });

  const filterComponents = [
    {
      name: "room",
      Component: RoomCount,
      defaultProps: { roomCount, setRoomCount },
    },
    {
      name: "adult",
      Component: AdultCount,
      defaultProps: { adultCount, setAdultCount },
    },
    {
      name: "child",
      Component: ChildrenCount,
      defaultProps: {
        childCount,
        handleChildCountDecrement,
        handleChildCountIncrement,
      },
    },
  ];

  const pickedComponents = props.data.pickedComponents.map(
    (element, iterator) => {
      const index = filterComponents.findIndex((item) => {
        return item.name == element;
      });
      const Component = filterComponents[index].Component;
      return (
        <Component
          key={iterator}
          {...filterComponents[index].defaultProps}
        ></Component>
      );
    }
  );

  const sumText = `${
    props.data.pickedComponents.filter((item) => item == "room").length == 1
      ? ` ${roomCount} ${
          roomCount > 1
            ? GetResourceByValue("common.rooms")
            : GetResourceByValue("common.room")
        }`
      : ""
  } ${
    props.data.pickedComponents.filter((item) => item == "adult").length == 1
      ? ` ${adultCount} ${
          adultCount > 1
            ? GetResourceByValue("common.adults")
            : GetResourceByValue("common.adult")
        }`
      : ""
  } ${
    props.data.pickedComponents.filter((item) => item == "child").length == 1
      ? ` ${childCount} ${
          childCount > 1
            ? GetResourceByValue("common.children")
            : GetResourceByValue("common.child")
        }`
      : ""
  }`;
  return (
    <div
      ref={optionRef}
      className="list-screen-header-option-wrapper guests-select-border"
      style={{ zIndex: 2 }}
    >
      <div
        className="d-flex align-items-center h-100"
        onClick={() => {
          setIsSelected(!isSelected);
        }}
      >
        <IoIosMan className="fs-2 px-2" />
        <div>
          <p className="m-0">{GetResourceByValue("common.guest")}</p>
          <p className="m-0">{sumText}</p>
        </div>
      </div>
      <div
        className={`lsh-option-hideable position-absolute w-100  d-flex flex-column justify-content-around p-1 pt-3 mt-1 shadow gap-4 ${
          isSelected ? " " : "d-none"
        }`}
      >
        {pickedComponents}
        {childElements}
        <button className="btn btn-primary">
          {GetResourceByValue("common.update")}
        </button>
      </div>
    </div>
  );
};

export default GuestOption;

const RoomCount = (props) => {
  return (
    <div className="d-flex justify-content-around align-items-center">
      <p className="m-0 go-text">{GetResourceByValue("common.rooms")}</p>
      <button
        className="go-button"
        disabled={props.roomCount <= 1 ? true : false}
        onClick={() => {
          props.setRoomCount(props.roomCount - 1);
        }}
      >
        {"-"}
      </button>
      <p className="m-0">{props.roomCount}</p>
      <button
        className="go-button"
        onClick={() => {
          props.setRoomCount(props.roomCount + 1);
        }}
      >
        {"+"}
      </button>
    </div>
  );
};

const AdultCount = (props) => {
  return (
    <div className="d-flex justify-content-around align-items-center">
      <p className="m-0 go-text">{GetResourceByValue("common.adults")}</p>
      <button
        className="go-button"
        disabled={props.adultCount <= 0 ? true : false}
        onClick={() => {
          props.setAdultCount(props.adultCount - 1);
        }}
      >
        {"-"}
      </button>
      <p className="m-0">{props.adultCount}</p>
      <button
        className="go-button"
        onClick={() => {
          props.setAdultCount(props.adultCount + 1);
        }}
      >
        {"+"}
      </button>
    </div>
  );
};

const ChildrenCount = (props) => {
  return (
    <div
      className="d-flex justify-content-around align-items-center pb-3"
      style={
        props.childCount > 0
          ? { borderBottom: "1px solid rgb(182 , 182 , 182) " }
          : {}
      }
    >
      <p className="m-0 go-text">{GetResourceByValue("common.children")}</p>
      <button
        className="go-button"
        disabled={props.childCount <= 0 ? true : false}
        onClick={() => {
          props.handleChildCountDecrement();
        }}
      >
        {"-"}
      </button>
      <p className="m-0">{props.childCount}</p>
      <button
        className="go-button"
        onClick={() => {
          props.handleChildCountIncrement();
        }}
      >
        {"+"}
      </button>
    </div>
  );
};
