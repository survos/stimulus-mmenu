"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _stimulus = require("stimulus");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require('mmenu-js');

var _default = /*#__PURE__*/function (_Controller) {
  _inherits(_default, _Controller);

  var _super = _createSuper(_default);

  function _default() {
    _classCallCheck(this, _default);

    return _super.apply(this, arguments);
  }

  _createClass(_default, [{
    key: "connect",
    value: function connect() {
      var _this = this;

      console.warn('hello from menu_controller depth= ' + this.depthValue, this.msgTarget); // console.log('Tree Target ', this.treeTarget);

      this.msgTarget.innerHTML = 'loading ' + this.currentMenuItemValue;
      this.addListeners(); // could also get a class="fetch" or something.

      if (false) this.treeTarget.querySelectorAll('[data-href]').forEach(function (item) {
        console.log("activating partial fetch for " + item.dataset.href);
        item.addEventListener("click", function (evnt) {
          console.error("click handler for " + item.dataset.href);
          evnt.preventDefault(); //
          // item.removeAttribute("href"); // hackish, trying to block the item from opening a new page

          item.classList.add("ancestor-active");

          if (item.dataset.href) {
            var url = item.dataset.href;
            console.error(url);
            _this.contentTarget.innerText = "Loading ..." + url;
            fetch(url).then(function (response) {
              return response.text();
            }).then(function (html) {
              _this.contentTarget.innerHTML = html;
            })["catch"](function (error) {
              _this.contentTarget.innerHTML = error.toString();
              console.error('Error:', error);
            });
          } // Example of dynamic list creation.
          //    Find the panel and listview.
          // const panel = document.querySelector("#my-list");
          // const listview = panel.querySelector(".mm-listview");
          //
          // //    Create the new listitem.
          // const listitem = document.createElement("li");
          // listitem.innerHTML = `<a href="/work">Our work</a>`;
          //
          // //    Add the listitem to the listview.
          // listview.append(listitem);
          //
          // //    Update the listview.
          // api.initListview(listview);

        });
      }); // e = this.playground();

      var e = this.advanced(); // const e = this.basic();

      var api = e.API;
      api.open(); // Open the sidebar, depending on the page (or class?)
      // api.open();
      // const panel = document.querySelector( "#my-panel" );
      // api.openPanel( panel );
      // this.msgTarget.innerHTML = 'Hello Stimulus!';
    }
  }, {
    key: "advanced",
    value: function advanced() {
      this.msgTarget.innerText = "Initializing mmenu...";
      console.time("mmenu");
      var e = new Mmenu(this.treeTarget, {
        extensions: ['theme-dark'],
        // , 'shadow-page'
        setSelected: true,
        slidingSubmenus: true,
        counters: true,
        searchfield: {
          placeholder: 'Search menu items'
        },
        iconbar: {
          use: '(min-width: 450px)',
          top: ['<a href="/"><span class="fa fa-home"></span></a>', '<a href="#/"><span class="fa fa-university"></span></a>'],
          bottom: ['<a href="#/"><span class="fab fa-twitter"></span></a>', '<a href="#/"><span class="fab fa-facebook"></span></a>', '<a href="#/"><span class="fab fa-youtube"></span></a>']
        },
        sidebar: {
          collapsed: {
            use: '(min-width: 450px)',
            hideNavbar: false
          },
          expanded: {
            use: '(min-width: 992px)'
          }
        },
        navbars: [{
          content: ['searchfield']
        }, {
          type: 'tabs',
          content: ['<a href="#panel-ac"><i class="fas fa-bars"></i> <span>AC</span></a>', // '<a href="#panel-menu"><i class="fa fa-bars"></i> <span>Demo</span></a>',
          '<a href="#panel-account"><i class="fas fa-user"></i> <span>Account</span></a>' // '<a href="#panel-cart"><i class="fa fa-shopping-cart"></i> <span>Cart</span></a>',
          ]
        }, {
          content: ['prev', 'breadcrumbs', 'close']
        }, {
          position: 'bottom',
          content: ['<a href="https://voxitour.com" target="_blank">(c)Voxitour.com</a>']
        }]
      }, {
        searchfield: {
          clear: true
        },
        navbars: {
          breadcrumbs: {
            removeFirst: true
          }
        }
      });
      console.timeEnd('mmenu');
      return e;
    }
  }, {
    key: "tutorial",
    value: function tutorial() {
      Mmenu.configs.classNames.selected = "active";
      Mmenu.configs.offCanvas.page.selector = "#page";
      var menu = new Mmenu(this.treeTarget, {
        slidingSubmenus: false,
        extensions: ["theme-dark"]
      });
      return menu;
    }
  }, {
    key: "basic",
    value: function basic() {
      var e = new Mmenu(this.treeTarget, {
        slidingSubmenus: true,
        transitionDuration: 0.01,
        classNames: {
          selected: "active"
        },
        // "offCanvas": false,
        "extensions": ["pagedim-black", "theme-dark" // "fx-menu-slide",
        // "fx-panels-none",
        ]
      });
      return e;
    }
  }, {
    key: "playground",
    value: function playground() {
      var e = new Mmenu(this.treeTarget, {
        extensions: {
          all: ["theme-white", "pagedim-black"],
          "(max-width: 767px)": ["fx-menu-slide"]
        },
        wrappers: ["bootstrap"],
        hooks: {
          "setSelected:before": function setSelectedBefore(panel) {
            console.warn(panel);
          },
          "openPanel:start": function openPanelStart(panel) {
            console.log("Started opening pane: " + panel.id, panel);
          },
          "openPanel:finish": function openPanelFinish(panel) {
            console.log("Finished opening panel: " + panel.id);
          }
        },
        counters: !0,
        // iconPanels: {add: !0, hideDivider: !0, hideNavbar: !0, visible: "first"},
        keyboardNavigation: !0,
        navbar: {
          title: "mmenu"
        },
        navbars: [{
          position: "top",
          content: ["searchfield"]
        }, {
          position: "top"
        }],
        searchfield: {
          panel: {
            add: !0,
            splash: '<p>What are you looking for?<br />Search the menu or try some of these popular pages:</p><a href="/examples.html">Advanced examples</a><br /><a href="/tutorials/off-canvas">Off-canvas tutorial</a><br /><a href="/download.html">Download the plugin</a><br /><a href="/wordpress-plugin">mmenu WordPress plugin</a><br /><br /><small>Documentation:</small><br .><a href="/docs/core/options.html">Options</a><br /><a href="/docs/extensions">Extensions</a><br /><a href="/docs/addons">Add-ons</a><br /><a href="/docs/core/api.html">API</a>'
          }
        },
        setSelected: {
          hover: !0,
          parent: !0
        },
        sidebar: {
          collapsed: {
            use: 480,
            hideNavbar: !0,
            hideDivider: !0
          },
          expanded: {
            use: 800,
            initial: "remember"
          }
        }
      }, {
        offCanvas: {
          page: {
            selector: "#page"
          }
        },
        searchfield: {
          clear: !0
        }
      }).API,
          t = $("#hamburger").children(".mburger");
      e.bind("close:finish", function () {
        setTimeout(function () {
          t.attr("href", "#menu");
        }, 100);
      });
      e.bind("open:finish", function () {
        setTimeout(function () {
          t.attr("href", "#page");
        }, 100);
      });
      return e;
    }
  }, {
    key: "addListeners",
    value: function addListeners() {
      var _this2 = this;

      console.assert(this.contentTarget, "Missing contentTarget");
      this.treeTarget.addEventListener('click', function (evnt) {
        // this.treeTarget.querySelector('.mm-panels').addEventListener('click', (evnt) => {
        // this.treeTarget.querySelector('.mm-panels').addEventListener('click', (evnt) => {
        // var anchor = evnt.target.closest('a[href^="#/"]');
        var anchor = evnt.target.closest('a');

        if (anchor) {
          var href = anchor.getAttribute("href"); // just path, use .href for full url
          // alert("Thank you for clicking, we will load " + href);

          console.log(anchor, anchor.closest('div'), href); // load relative links only.

          if (href.charAt(0) === '/') {
            href += '?_partial=1';
            evnt.preventDefault();
            _this2.contentTarget.innerText = "Loading ..." + href;
            _this2.msgTarget.innerHTML = "<a target=\"_blank\" href=\"".concat(href, "\">").concat(href, "</a>"); // let url = new URL('https://example.com?foo=1&bar=2');
            // let params = new URLSearchParams(url.search.slice(1));
            // params.append('foo', 4);

            fetch(href, {
              redirect: 'follow',
              mode: 'cors',
              credentials: 'include'
            }).then(function (response) {
              return response.text();
            }).then(function (html) {
              var _doc$getElementById;

              // const htmlString = "<strong>Beware of the leopard</strong>";
              _this2.contentTarget.innerHTML = "about to parse.";
              var parser = new DOMParser();
              var doc = parser.parseFromString(html, "text/html");
              var content = ((_doc$getElementById = doc.getElementById('html_content')) === null || _doc$getElementById === void 0 ? void 0 : _doc$getElementById.innerHTML) || html;
              console.assert(content, "missing html_content element: " + html); // target.replaceWith(element)
              // let title = document.getElementsByName('title')[0];

              var title = document.title;
              console.error(title); // seems like there should be a way to add the node directly, without overwriting the data-mmenu-target

              _this2.contentTarget.innerHTML = content; // this.contentTarget =  doc.getElementById('html_content');
              // this.contentTarget.replaceWith(content);

              document.title = doc.title; // window.history.pushState({"html":response.html,"pageTitle":response.pageTitle},"", urlPath);
            })["catch"](function (error) {
              _this2.contentTarget.innerHTML = error.toString();
              document.location = href;
              console.error('Error:', error);
            });
          }
        }
      });
    }
  }]);

  return _default;
}(_stimulus.Controller);

exports["default"] = _default;

_defineProperty(_default, "targets", ['mmenu', 'msg', 'tree', 'content']);

_defineProperty(_default, "values", {
  currentMenuItem: String,
  depth: Number // depth: { type: Number, default: 2 }, stimulus 2.1?

});