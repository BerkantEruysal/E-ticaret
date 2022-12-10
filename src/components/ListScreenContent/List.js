import React, { useEffect, useState } from "react";
import ListElement from "./ListElement";
import getSkiResortList from "../../api/List";
import { Loader } from "rsuite";
import { useSelector } from "react-redux/es/exports";

const List = ({ data, itemBaseUrl, listType, TypeIcon, entityGroup }) => {
  const isLoading = useSelector((state) => {
    return state.content.isDataLoading;
  });

  useEffect(() => {
    if (isLoading) {
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  return (
    <div className=" d-flex flex-column gap-3  ">
      {isLoading ? (
        <div className="position-relative h-100" style={{ minHeight: 500 }}>
          <Loader backdrop content="loading..." vertical />
        </div>
      ) : data[listType].length > 0 ? (
        <>
          {data[listType].map((data, i) => {
            return (
              <ListElement
                itemBaseUrl={itemBaseUrl}
                key={data.Id}
                data={data}
                dataIndex={i + 1}
                listType={listType}
                TypeIcon={TypeIcon}
                entityGroup={entityGroup}
              ></ListElement>
            );
          })}
        </>
      ) : (
        <div className="d-flex h-100 align-items-center justify-content-center p-3">
          <h3>We couldn't find anything with the given filters ;{`(`}</h3>
        </div>
      )}
    </div>
  );
};

export default List;
