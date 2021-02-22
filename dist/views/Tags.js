import styled from "../../_snowpack/pkg/@emotion/styled.js";
import React from "../../_snowpack/pkg/react.js";
import CategoryDisplay from "../components/categories/CategoryDisplay.js";
import CategoryInlineForm from "../components/categories/CategoryInlineForm.js";
import {useDatabase} from "../contexts/DatabaseContext.js";
import {SETTINGS_DOCUMENT_ID} from "../domain/documents/settingsDocument.js";
import ContentElement from "../layout/default/ContentElement.js";
import {createSubscriptionEffect} from "../utils/rxdb.js";
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
  const getTags = React.useCallback(() => createSubscriptionEffect(async () => {
    const settings = await database?.getLocal(SETTINGS_DOCUMENT_ID);
    return database?.profiles.findOne({selector: {profileId: settings?.profile}}).$.subscribe((doc) => {
      if (doc) {
        setProfile(doc);
        setTags(doc.tags);
      }
      setLoading(false);
    });
  }), [database]);
  React.useEffect(() => getTags(), [getTags]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ContentElement, null, /* @__PURE__ */ React.createElement(CategoryInlineForm, {
    create: createTag
  })), /* @__PURE__ */ React.createElement(TagDisplayContainer, null, /* @__PURE__ */ React.createElement(CategoryDisplay, {
    categories: tags,
    update: updateTag,
    remove: removeTag,
    loading
  })));
}
