// Дэлгэцтэй ажиллах контроллер
var uiController = (function() {
  var DOMStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenceList: ".expenses__list",
    tusuvLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenceLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    containerDiv: ".container",
    expPercentageLabel: ".item__percentage",
    dateLabel: ".budget__title--month"
  };
  // NodeList - дээр forEach байхгүй тул давталт хийдэг энэ функц үүсгэж ашиглана
  var nodeListForEach = function(list, callback) {
    for (i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };
  var formatMoney = function(too, type) {
    too = "" + too;
    var x = too
      .split("")
      .reverse()
      .join("");
    var y = "";
    var count = 1;
    for (var i = 0; i < x.length; i++) {
      y = y + x[i];
      if (count % 3 === 0) y = y + ",";
      count++;
    }
    var z = y
      .split("")
      .reverse()
      .join("");
    if (z[0] === ",") z = z.substring(1, z.length);
    if (type === "inc") z = "+ " + z;
    else z = "- " + z;
    return z;
  };
  return {
    displayDate: function() {
      var unuudur = new Date();
      document.querySelector(DOMStrings.dateLabel).textContent =
        unuudur.getFullYear() + " оны " + unuudur.getMonth() + " - р сарын ";
    },

    getInput: function() {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMStrings.inputValue).value)
      };
    },
    // Элементүүдийн хувийг дэлгэцэнд харуулах функц
    displayPercentages: function(allPersentages) {
      // Зарлагын NodeList-ийг олох - DOM-ийн 1ш элемент/таг/-ыг Node гэнэ.
      var elements = document.querySelectorAll(DOMStrings.expPercentageLabel);
      // NodeList - дээр forEach байхгүй тул өөр функц ашиглана: nodeListForEach()-гэж үүсгэнэ
      // Энэ нь элемент бүрийн хувьд зарлагын хувийг массиваас авч оруулна
      nodeListForEach(elements, function(el, index) {
        el.textContent = allPersentages[index] + " %";
      });
    },

    getDOMStrings: function() {
      return DOMStrings;
    },

    // Оруулсан өгөгдлүүдийн талбарыг цэвэрлэх
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

    // return {
    //   tusuv: data.tusuv,
    //   huvi: data.huvi,
    //   totalInc: data.totals.inc,
    //   totalExp: data.totals.exp
    // };

    // Төсвийн орлого, зарлагын мэдээллийг дэлгэц дээр гаргах
    tusuvUzuuleh: function(tusuv) {
      var type;
      if (tusuv.tusuv >= 0) type = "inc";
      else type = "exp";
      document.querySelector(DOMStrings.tusuvLabel).textContent =
        formatMoney(tusuv.tusuv, type) + " ₮";
      document.querySelector(DOMStrings.incomeLabel).textContent = formatMoney(
        tusuv.totalInc,
        "inc"
      );
      document.querySelector(DOMStrings.expenceLabel).textContent = formatMoney(
        tusuv.totalExp,
        "exp"
      );
      if (tusuv.huvi !== 0) {
        document.querySelector(DOMStrings.percentageLabel).textContent =
          tusuv.huvi + " %";
      } else document.querySelector(DOMStrings.percentageLabel).textContent = 0;
    },

    // Сонгосон өгөгдлийг дэлгэц дээрх жагсаалтаас устгах
    deleteListItem: function(id) {
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },
    // Орлого, зарлагын элемент агуулсан html-ыг бэлтгэнэ
    addListItem: function(item, type) {
      // Орлого, зарлага бичигдэх хэсгийн html кодыг хувьсагчид текст хэлбэртэй болгож хадгална.
      var html, list;
      if (type === "inc") {
        list = DOMStrings.incomeList;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i>   </button></div>  </div></div>';
      } else {
        list = DOMStrings.expenceList;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // Тэр HTML дотор орлого, зарлагын утгуудыг REPLACE ашиглаж өөрчилж өгнө
      html = html.replace("%id%", item.id);
      html = html.replace("%DESCRIPTION%", item.description);
      html = html.replace("%VALUE%", formatMoney(item.value, type));

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
    this.percentage = -1; // Хувь бодоогүй үед авах утга гэж үзсэн
  };
  // Оруулсан өгөгдлийн хувь тооцоолох Expence -ээс удамшуулан үүсгэсэн функц
  Expence.prototype.calcPercentage = function(totalIncome) {
    if (totalIncome > 0)
      this.percentage = Math.round((this.value / totalIncome) * 100);
    else this.percentage = 0;
  };
  // Өгөгдлийн эзлэх хувийг буцаах Expence -ээс удамшуулан үүсгэсэн функц
  Expence.prototype.getPercentage = function() {
    return this.percentage;
  };

  // Орлого зарлагын нийлбэр бодох функц
  var calculateTotal = function(type) {
    var sum = 0;
    data.items[type].forEach(function(el) {
      sum = sum + el.value;
    });
    data.totals[type] = sum;
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
    },
    tusuv: 0,
    huvi: 0
  };
  return {
    seeData: function() {
      return data;
    },
    tusuvTootsooloh: function() {
      // Нийт орлогын нийлбэрийг тооцоолно
      calculateTotal("inc");
      // Нийт зарлагын нийлбэрийг тооцоолно
      calculateTotal("exp");
      // Нийт төсөв тооцоолох
      data.tusuv = data.totals.inc - data.totals.exp;
      // Орлого, зарлагын хувийг тооцоолох
      if (data.totals.inc !== 0)
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
    },
    // Өгөгдөл бүрт  орлогын нийт дүнг дамжуулж, бодогдсон хувийг нь цуглуулж авах функц
    calculatePercentages: function() {
      data.items.exp.forEach(function(el) {
        el.calcPercentage(data.totals.inc);
      });
    },
    // Өгөгдөл бүрээс бодогдсон хувийг цуглуулж аваад массивд хийж, уг массивыг буцаах функц
    getPercentages: function() {
      var allPersentages = data.items.exp.map(function(el) {
        return el.getPercentage();
      });
      return allPersentages;
    },
    // Төсөв, орлого, зарлагын нийт дүнг хадгалж авах
    tusuvAvah: function() {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp
      };
    },
    // Жагсаалтаас сонгосон элементийг өгөгдлийн бүтцээс устгана.
    deleteItem: function(type, id) {
      var ids = data.items[type].map(function(el) {
        return el.id;
      });

      var index = ids.indexOf(id);

      if (index !== -1) {
        data.items[type].splice(index, 1);
      }
    },
    // Шинэ өгөгдлийг өгөгдлийн бүтэц руу обьект хэлбэрээр хадгална.
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

    if (input.description !== "" && input.value !== "") {
      // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж боловсруулан хадгална.
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );
      // 3. Олж авсан өгөгдлүүдээ вэбийн тохирох  хэсэгт гаргана.
      uiController.addListItem(item, input.type);
      uiController.clearFields();
      // Төсвийн шинээр тооцоолоод дэлгэцэнд үүзүүлнэ
      updateTusuv();
    }
  };
  var updateTusuv = function() {
    // 4. Төсвийг тооцоолно.
    financeController.tusuvTootsooloh();
    // 5. Эцсийн үлдэгдэл, тооцоог нэгтгэж хадгална
    var tusuv = financeController.tusuvAvah();
    // 6. Төсвийн тооцоог дэлгэцэнд гаргана.
    uiController.tusuvUzuuleh(tusuv);
    // 7. Элементүүдийн хувийг тооцоолно
    financeController.calculatePercentages();
    // 8. Элементүүдийн хувийг хүлээж авна
    var allPersentages = financeController.getPercentages();

    // 9. Эдгээр хувийг дэлгэцэнд гаргана.
    uiController.displayPercentages(allPersentages);
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
    document
      .querySelector(DOM.containerDiv)
      .addEventListener("click", function(e) {
        // Үндсэн элемент(target) дээр click хийх үед Эцэг элемент(parentNode)-ын class дахь id-г сонгож аваад id - хувьсагчид олгох (parentNode нь хэдэн ш байх нь HTML-бүтцээс хамаарна.)
        var id = e.target.parentNode.parentNode.parentNode.parentNode.id;
        if (id) {
          var arr = id.split("-");
          var type = arr[0];
          var itemId = parseInt(arr[1]); // parceInt()-тэмдэгт мөрийг тоо болгож хувиргана (id тул)
          // 1. Санхүүгийн модулиас type, itemId -г ашиглаад устгана
          financeController.deleteItem(type, itemId);
          //2. Дэлгэц дээрээс энэ элементийг устгана.
          uiController.deleteListItem(id);
          //3. Үлдэгдэл тооцоог шинэчилж харуулна.
          updateTusuv();
        }
      });
  };
  return {
    init: function() {
      console.log("Application start ...");
      uiController.displayDate();
      uiController.tusuvUzuuleh({
        tusuv: 0,
        huvi: 0,
        totalInc: 0,
        totalExp: 0
      });
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
