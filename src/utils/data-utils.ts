import { DocumentNode } from "@apollo/client";

function getGqlString(doc: DocumentNode) {
    return doc.loc && doc.loc.source.body;
}

export { getGqlString }