/// <reference types= "cypress" />
describe("ApiTesting", () => {
  const bookNames = [
    "The Catcher in the Rye",
    "To Kill a Mockingbird",
    "1984",
    "The Great Gatsby",
    "Pride and Prejudice",
    "The Hobbit",
    "Moby-Dick",
    "The Lord of the Rings",
    "War and Peace",
    "The Odyssey",
  ];
  const fullNames = [
    "John Smith",
    "Alice Johnson",
    "Michael Brown",
    "Emily Davis",
    "David Lee",
    "Sophia Wilson",
    "Daniel Anderson",
    "Olivia Martinez",
    "James Taylor",
    "Isabella Hernandez",
  ];


  let RandomIndexForBookName = Math.floor(Math.random()*bookNames.length)
  let RandomIndexForAuthorName = Math.floor(Math.random()*fullNames.length)




  let RandomISbn = Math.floor(Math.random() * 5478745);
  let Randomaisle = Math.floor(Math.random() * 5478745);

  it("test Post Request", () => {
    let BASEURL = "https://rahulshettyacademy.com/Library/Addbook.php";

    let RequestBody = {
      name: bookNames[RandomIndexForBookName],
      isbn: RandomISbn,
      aisle: Randomaisle,
      author: fullNames[RandomIndexForAuthorName],
    };

    cy.request({
      method: "POST",
      url: BASEURL,
      body: RequestBody,
    }).then((Response) => {
      cy.log(Response.body);
      expect(Response.status).to.eq(200);
      expect(Response.body.Msg).to.eq("successfully added");
    });
  });

  it("Test Get request", () => {
    let BASEURL = `https://rahulshettyacademy.com/Library/GetBook.php?ID=${RandomISbn}${Randomaisle}`;

    cy.request({
      method: "GET",
      url: BASEURL,
    }).then((Response) => {
      cy.log(Response.body[0].book_name);
      expect(Response.status).to.eq(200);
      expect(Response.body[0].book_name).to.eq(bookNames[RandomIndexForBookName]);
    });
  });

  it("Test Delete Request", () => {
    let BaseURL = "https://rahulshettyacademy.com/Library/DeleteBook.php";

    let RequestBody = {
      ID: `${RandomISbn}${Randomaisle}`,
    };

    cy.request({
      method: "DELETE",
      url: BaseURL,
      body: RequestBody,
    }).then((Response) => {
      cy.log(Response);
      expect(Response.status).to.eq(200);
      expect(Response.body.msg).to.eq("book is successfully deleted");
    });
  });

  it("Test Get request for none existed book", () => {
    let BASEURL = `https://rahulshettyacademy.com/Library/GetBook.php?ID=${RandomISbn}${Randomaisle}`;

    cy.request({
      method: "GET",
      url: BASEURL,
      failOnStatusCode: false,

    }).then((Response) => {
      cy.log(Response.body.msg+"@@@@@@@@@");
      expect(Response.status).to.eq(404);
      expect(Response.body.msg).to.eq("The book by requested bookid / author name does not exists!");
    });
  });
});
