import store from "../redux/store";
import linq from "linq";

export const GetResourceByValue = (resourceName) => {
  const resources = store.getState().language.resource;
  const listValue = linq
    .from(resources)
    .where((resource) => resource.ResourceName == resourceName)
    .toArray();
  if(listValue.length == 0) return resourceName;
  const entityValue = linq.from(listValue).first();
  return entityValue.ResourceValue;
};

export const GetSettingByValue = async (resourceValue) => {
  //const resources = store.getState().settings;
  //const listValue = linq.from(resources).where(resource => resource.ResourceName = resourceName).toArray();
  //const entityValue = linq.from(listValue).first();
  //return entityValue.ResourceValue;
};
