import { DocumentNode } from "@apollo/react-hooks";

function getGqlString(doc: DocumentNode) {
    return doc.loc && doc.loc.source.body;
}

export { getGqlString }