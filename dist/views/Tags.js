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
const TagDisplayContainer = styled(ContentElement)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
export default function Tags() {
  const database = useDatabase();
  const [profile, setProfile] = React.useState();
  const [tags, setTags] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const createTag = (tag) => {
    profile?.update({$push: {tags: tag}});
  };
  const updateTag = (previous, next) => {
    profile?.update({$set: {tags: tags.map((c) => c.name === previous.name ? next : c)}});
  };
  const removeTag = (tag) => {
    profile?.update({$pullAll: {tags: [tag]}});
  };
  React.useEffect(createAsyncSubscriptionEffect(async () => {
    const settings = await database?.getLocal(SETTINGS_DOCUMENT_ID);
    return database?.profiles.findOne({selector: {profileId: settings?.profile}}).$.subscribe((doc) => {
      if (doc) {
        setProfile(doc);
        setTags(doc.tags);
      }
      setLoading(false);
    });
  }), [database]);
  return /* @__PURE__ */ React.createElement(ContentContainer, null, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h2"
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "title.tags",
    defaultMessage: "Tags"
  })), /* @__PURE__ */ React.createElement(ContentElement, null, /* @__PURE__ */ React.createElement(CategoryInlineForm, {
    create: createTag
  })), /* @__PURE__ */ React.createElement(TagDisplayContainer, null, /* @__PURE__ */ React.createElement(CategoryDisplay, {
    categories: tags,
    update: updateTag,
    remove: removeTag,
    loading
  })));
}
