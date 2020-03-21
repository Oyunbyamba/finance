// Дэлгэцтэй ажиллах контроллер
var uiController = (function() {
  var DOMStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenceList: ".expenses__list"
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
    },

    clearFields: function() {
      var fields = document.querySelectorAll(
        DOMStrings.inputDescription + "," + DOMStrings.inputValue
      );
      // Convert LIST to ARRAY
      var fieldsArr = Array.prototype.slice.call(fields);
      // for (i = 0; i < fieldsArr.length; i++) {
      //   fieldsArr[i].value = "";
      // }
      fieldsArr.forEach(function(el, index, array) {
        el.value = "";
      });
      fieldsArr[0].focus();
    },

    addListItem: function(item, type) {
      // Орлого, зарлагын элемент агуулсан html-ыг бэлтгэнэ: Орлого, зарлага бичигдэх хэсгийн html кодыг хувьсагчид текст хэлбэртэй болгож хадгална.
      var html, list;
      if (type === "inc") {
        list = DOMStrings.incomeList;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">+%VALUE%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i>   </button></div>  </div></div>';
      } else {
        list = DOMStrings.expenceList;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">-%VALUE%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // Тэр HTML дотор орлого, зарлагын утгуудыг REPLACE ашиглаж өөрчилж өгнө
      html = html.replace("%id%", item.id);
      html = html.replace("%DESCRIPTION%", item.description);
      html = html.replace("%VALUE%", item.value);

      // Бэлтгэсэн HTML-ээ DOM руу хийж өгнө.
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
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
    items: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    }
  };
  return {
    addItem: function(type, desc, val) {
      var item, id;
      // id үүсгэх - items-ийн хамгийн сүүлчийн элемент дээр +1 гэж үүсгэнэ.
      if (data.items[type].length === 0) id = 1;
      else id = data.items[type][data.items[type].length - 1].id + 1;

      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expence(id, desc, val);
      }
      data.items[type].push(item);
      return item;
    }
  };
})();

// Эвентүүдтэй ажиллах буюу програмын холбогч контроллер
var appController = (function(uiContr, fnContr) {
  var DOM = uiController.getDOMStrings();
  var ctrlAddItem = function() {
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
    var input = uiController.getInput();

    // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж боловсруулан хадгална.
    var item = financeController.addItem(
      input.type,
      input.description,
      input.value
    );
    // 3. Олж авсан өгөгдлүүдээ вэбийн тохирох  хэсэгт гаргана.
    uiController.addListItem(item, input.type);
    uiController.clearFields();
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
