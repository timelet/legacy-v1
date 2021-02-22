import styled from "../../_snowpack/pkg/@emotion/styled.js";
import React from "../../_snowpack/pkg/react.js";
import CategoryDisplay from "../components/categories/CategoryDisplay.js";
import CategoryInlineForm from "../components/categories/CategoryInlineForm.js";
import {useDatabase} from "../contexts/DatabaseContext.js";
import {SETTINGS_DOCUMENT_ID} from "../domain/documents/settingsDocument.js";
import ContentElement from "../layout/default/ContentElement.js";
import {createSubscriptionEffect} from "../utils/rxdb.js";
const CategoryDisplayContainer = styled(ContentElement)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
export default function Categories() {
  const database = useDatabase();
  const [profile, setProfile] = React.useState();
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const createCategory = (category) => {
    profile?.update({$push: {categories: category}});
  };
  const updateCategory = (previous, next) => {
    profile?.update({$set: {categories: categories.map((c) => c.name === previous.name ? next : c)}});
  };
  const removeCategory = (category) => {
    profile?.update({$pullAll: {categories: [category]}});
  };
  const getCategories = React.useCallback(() => createSubscriptionEffect(async () => {
    const settings = await database?.getLocal(SETTINGS_DOCUMENT_ID);
    return database?.profiles.findOne({selector: {profileId: settings?.profile}}).$.subscribe((doc) => {
      if (doc) {
        setProfile(doc);
        setCategories(doc.categories);
      }
      setLoading(false);
    });
  }), [database]);
  React.useEffect(() => getCategories(), [getCategories]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ContentElement, null, /* @__PURE__ */ React.createElement(CategoryInlineForm, {
    create: createCategory
  })), /* @__PURE__ */ React.createElement(CategoryDisplayContainer, null, /* @__PURE__ */ React.createElement(CategoryDisplay, {
    categories,
    update: updateCategory,
    remove: removeCategory,
    loading
  })));
}
