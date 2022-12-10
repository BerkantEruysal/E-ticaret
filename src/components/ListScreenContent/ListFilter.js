import React from "react";
import {
  Panel,
  PanelGroup,
  Placeholder,
  CheckboxGroup,
  Checkbox,
  RangeSlider,
  InputGroup,
  InputNumber,
  Row,
  Col,
} from "rsuite";
import { useRequestSender } from "../../Hooks";
import { getListScreenContent } from "../../api/List";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { GetResourceByValue, GetSettingByValue } from "../DynamicSelectors";

const ListFilter = (props) => {
  const listType = props.listType;
  const listName = props.listName;
  const apiRoute = props.apiRoute;

  function onChange(value) {
    getListScreenContent({
      listName: listName,
      name: listType,
      route: apiRoute,
      body: { Deleted: false, entityFacilityIds: value },
    });
  }

  function PriceFilter() {
    const [value, setValue] = React.useState([0, 5000]);
    return (
      <>
        <Row>
          <Col md={11} className="text-end">
            <InputNumber
              plaintext
              min={0}
              max={5000}
              value={value[0]}
              onChange={(nextValue) => {
                const [start, end] = value;
                if (nextValue > end) {
                  return;
                }
                setValue([nextValue, end]);
              }}
            />
          </Col>
          <Col>{GetResourceByValue("common.to")}</Col>
          <Col md={11} className="text-start">
            <InputNumber
              plaintext
              min={0}
              max={5000}
              value={value[1]}
              onChange={(nextValue) => {
                const [start, end] = value;
                if (start > nextValue) {
                  return;
                }
                setValue([start, nextValue]);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col md={24}>
            <RangeSlider
              progress
              style={{ marginTop: 16 }}
              value={value}
              onChange={(value) => {
                setValue(value);
              }}
            />
          </Col>
        </Row>
      </>
    );
  }

  if (props.data != null) {
    const pagingFilteringContext = props.data.PagingFilteringContext;
    const facilityCategories = pagingFilteringContext.FacilityCategories;
    return (
      <>
        <PanelGroup accordion bordered className="filter-panel">
          <Panel header={GetResourceByValue("common.prices")}>
            <div className="px-2">
              <PriceFilter />
            </div>
          </Panel>
          {facilityCategories.map((facilityCategory) => {
            if (facilityCategory.FacilityList.Facilities.length == 0) {
              return <div key={facilityCategory.Id}></div>;
            }
            if (facilityCategory.FacilityList.Facilities != null) {
              return (
                <Panel
                  key={facilityCategory.Id}
                  header={facilityCategory.Title}
                  eventKey={facilityCategory.Id}
                >
                  <CheckboxGroup
                    onChange={(value) => {
                      onChange(value);
                    }}
                    name="checkboxList"
                  >
                    {facilityCategory.FacilityList.Facilities.map(
                      (facility) => {
                        return (
                          <Checkbox
                            className="left"
                            key={facility.Id}
                            value={facility.Id}
                          >
                            {facility.Title}
                          </Checkbox>
                        );
                      }
                    )}
                  </CheckboxGroup>
                </Panel>
              );
            }
          })}
        </PanelGroup>
        <PanelGroup accordion bordered className="d-none filter-panel">
          <Panel header="Popüler">
            <Placeholder.Paragraph />
          </Panel>
          <Panel header="İşletme türleri">
            <Placeholder.Paragraph />
          </Panel>
          <Panel header="Gezgin puanı">
            <Placeholder.Paragraph />
          </Panel>
          <Panel header="Otel Sınıfı">
            <Placeholder.Paragraph />
          </Panel>
          <Panel header="Tip">
            <Placeholder.Paragraph />
          </Panel>
          <Panel header="Markalar">
            <Placeholder.Paragraph />
          </Panel>
          <Panel header="Reklamlar">
            <Placeholder.Paragraph />
          </Panel>
        </PanelGroup>
      </>
    );
  }
  return "";
};

export default ListFilter;
