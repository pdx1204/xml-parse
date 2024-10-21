import { parse, type DocumentCstNode } from "@xml-tools/parser";
import { buildAst, accept } from "@xml-tools/ast";

const xmlText = `<note>
                     <to>Bill</to>
                     <from>Tim</from>
                 </note>
`;

const { cst, tokenVector } = parse(xmlText);
const xmlDocAst = buildAst(cst as DocumentCstNode, tokenVector);
console.log(xmlDocAst.rootElement!.name); // -> note

// A Visitor allows us to invoke actions on the XML ASTNodes without worrying about
// The XML AST structure / traversal method.
const printVisitor = {
  // Will be invoked once for each Element node in the AST.
  visitXMLElement: function (node) {
    console.log(node);
  },

  // An XML AST Visitor may have other methods as well, see the api.d.ts file/
};

// Invoking the Visitor
accept(xmlDocAst, printVisitor); // -> note, Bill, Tim
