/// <reference types="cypress" />

describe("template spec", () => {
  let AuthorNames = [
    "John Smith",
    "Mary Johnson",
    "David Davis",
    "Linda Wilson",
    "Michael Brown",
    "Jennifer Jones",
    "James Lee",
    "Patricia Martinez",
    "Robert Taylor",
    "Elizabeth White",
  ];
  // Generate a random number once
  const RandomISBN = Math.floor(Math.random() * 1000);
  const RanomdaAISLE = Math.floor(Math.random() * 1000);
const RandomAuthor = Math.floor(Math.random()*AuthorNames.length)


  it("test API", () => {
    const RequestBody = {
      name: "Qa private Zoom",
      isbn: RandomISBN,
      aisle: RanomdaAISLE,
      author:AuthorNames[RandomAuthor]
    };
    cy.request({
      method: "POST",
      url: "https://rahulshettyacademy.com/Library/Addbook.php",
      body: RequestBody,
    }).then((Response) => {
      cy.log(Response.body);
      expect(Response.status).to.eq(200);
      expect(Response.body.Msg).to.eq("successfully added");
    });
  });

  it("test Get Request", () => {
    cy.request(
      "GET",
      `https://rahulshettyacademy.com/Library/GetBook.php?ID=${RandomISBN}${RanomdaAISLE}`
    ).then((TheResponse) => {
      cy.log(TheResponse.body[0]);
      expect(TheResponse.status).to.eq(200);
      expect(TheResponse.body[0].author).to.eql(`${AuthorNames[RandomAuthor]}`);
    });
  });

  it('Test Delete Request', () => {

    const RequestBody = {
      "ID" :`${RandomISBN}${RanomdaAISLE}`
    }

    cy.request({
      method: "DELETE",
      url: "https://rahulshettyacademy.com/Library/DeleteBook.php",
      body: RequestBody,
    }).then((Response) => {
      cy.log(Response.body);
      expect(Response.status).to.eq(200);
      expect(Response.body.msg).to.eq("book is successfully deleted");
    });
  });
    
  });

