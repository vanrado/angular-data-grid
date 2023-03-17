import { Document } from './document';

const mockedDocuments: Document[] = [];

for (let i = 1; i <= 20; i++) {
  mockedDocuments.push({
    id: i,
    title: `Document ${i}`,
    author: `Author ${i}`,
    date: new Date(),
    content: `This is the content of document ${i}. It contains some random text to mock the data.`
  });
}

export const DOCUMENTS: Document[] = mockedDocuments;
