describe("Testing creating the board with setup and tear down", function () {
    beforeEach(function () {
        // Insert params of each function needed
        let board = []
        let currPlayer = 1;

    });        
    it("Checking makeBoard that it makes the correct array", function () {
        const WIDTH = 7;
        const HEIGHT = 6; 
        
        expect(board.length).toEqual(6);
        expect(board[0].length).toEqual(7);
        expect(Array.isArray(board)).toEqual(true);
    })

    // it("Checking makeHtmlBoard that it actually makes the correct elements", function () {
    //     const htmlBoard = document.querySelector("#board")
    //     console.log("htmlboard", document)
 
    //     makeBoard(WIDTH, HEIGHT);
    //     makeHtmlBoard();       

    //     expect(htmlBoard.innerHtml).toContain("td")    
    // })   

    afterEach(function () {
        // Insert things back to normal 
        board = []
    });   
})

describe("Testing all coorindate functions with setup and tear down", function () {
    beforeEach(function () {
        // Insert params of each function needed
        let board = []
        let currPlayer = 1;
        makeBoard(WIDTH, HEIGHT);
    });        
    it("Checking findSpotForCol(x) that it makes the correct array", function () {
   
        expect(findSpotForCol()).toEqual(5);
        // TODO: Figure out why i can't set it to test NULL
        // expect(findSpotForCol()).toEqual(null)
    })


    afterEach(function () {
        // Insert things back to normal 
        board = []
    });   
})