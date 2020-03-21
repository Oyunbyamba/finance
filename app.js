// Дэлгэцтэй ажиллах контроллер
var uiController = (function() {
  var DOMStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn"
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value
      };
    },
    getDOMStrings: function() {
      return DOMStrings;
    }
  };
})();

// Санхүүгийн тооцоололтой ажиллах контроллер
var financeController = (function() {
  // Орлого хүлээн авч массивд хадгалах зориулалттай байгуулагч функц
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  // Зарлага хүлээн авч массивд хадгалах зориулалттай байгуулагч функц
  var Expence = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  // Орлого, зарлага хадгалах дата өгөгдлүүд хадгалах обьект
  var data = {
    allItems: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    }
  };
})();

// Эвентүүдтэй ажиллах буюу програмын холбогч контроллер
var appController = (function(uiContr, fnContr) {
  var DOM = uiController.getDOMStrings();
  var ctrlAddItem = function() {
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
    console.log(uiController.getInput());

    // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж боловсруулан хадгална.
    // 3. Олж авсан өгөгдлүүдээ вэбийн тохирох  хэсэгт гаргана.
    // 4. Төсвийг тооцоолно.
    // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
  };
  var setupEventListeners = function() {
    var DOM = uiController.getDOMStrings();
    document.querySelector(DOM.addBtn).addEventListener("click", function() {
      ctrlAddItem();
    });
    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  return {
    init: function() {
      console.log("Application start ...");
      setupEventListeners();
    }
  };
})(uiController, financeController);

// Эвентлистенерүүдийг дуудах обьект
appController.init();

/*
// Орлого хүлээн авч массивд хадгалах зориулалттай байгуулагч функц
var Income = function(id, description, value) {
  this.id = id;
  this.description = description;
  this.value = value;
};
// Зарлага хүлээн авч массивд хадгалах зориулалттай байгуулагч функц
var Expence = function(id, description, value) {
  this.id = id;
  this.description = description;
  this.value = value;
};
var i1 = new Income(1, "Цалин", 2500000);
var i2 = new Income(2, "Машин зарсан", 12500000);
var i3 = new Income(3, "Бусад", 100000);
// console.log(i1, i2, i3);

var incomes = [];
incomes.push(i1);
incomes.push(i2);
incomes.push(i3);

console.log(incomes[2].id);
*/
