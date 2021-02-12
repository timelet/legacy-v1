import styled from "../../_snowpack/pkg/@emotion/styled.js";
import {Typography} from "../../_snowpack/pkg/@material-ui/core.js";
import React from "../../_snowpack/pkg/react.js";
import {FormattedMessage} from "../../_snowpack/pkg/react-intl.js";
import CategoryDisplay from "../components/categories/CategoryDisplay.js";
import CategoryInlineForm from "../components/categories/CategoryInlineForm.js";
import {useDatabase} from "../contexts/DatabaseContext.js";
import {SETTINGS_DOCUMENT_ID} from "../domain/documents/settingsDocument.js";
import ContentContainer from "../layout/default/ContentContainer.js";
import ContentElement from "../layout/default/ContentElement.js";
import {createAsyncSubscriptionEffect} from "../utils/rxdb.js";
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
  React.useEffect(createAsyncSubscriptionEffect(async () => {
    const settings = await database?.getLocal(SETTINGS_DOCUMENT_ID);
    return database?.profiles.findOne({selector: {profileId: settings?.profile}}).$.subscribe((doc) => {
      if (doc) {
        setProfile(doc);
        setCategories(doc.categories);
      }
      setLoading(false);
    });
  }), [database]);
  return /* @__PURE__ */ React.createElement(ContentContainer, null, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h2"
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "title.categories",
    defaultMessage: "Categories"
  })), /* @__PURE__ */ React.createElement(ContentElement, null, /* @__PURE__ */ React.createElement(CategoryInlineForm, {
    create: createCategory
  })), /* @__PURE__ */ React.createElement(CategoryDisplayContainer, null, /* @__PURE__ */ React.createElement(CategoryDisplay, {
    categories,
    update: updateCategory,
    remove: removeCategory,
    loading
  })));
}
