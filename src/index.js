import {Controller} from 'stimulus';

require('mmenu-js');

export default class extends Controller {
    static targets = ['mmenu', 'msg', 'tree', 'content'];
    static values = {
        currentMenuItem: String,
        depth: Number
        // depth: { type: Number, default: 2 }, stimulus 2.1?
    }

    connect() {
        console.warn('hello from menu_controller depth= ' + this.depthValue, this.msgTarget);
        // console.log('Tree Target ', this.treeTarget);
        this.msgTarget.innerHTML = 'loading ' + this.currentMenuItemValue;
        this.addListeners();
        // could also get a class="fetch" or something.
        if (false)
        this.treeTarget.querySelectorAll('[data-href]').forEach(item => {
            console.log("activating partial fetch for " + item.dataset.href);
            item
                .addEventListener(
                    "click", (evnt) => {
                        console.error("click handler for " + item.dataset.href);
                        evnt.preventDefault(); //
                        // item.removeAttribute("href"); // hackish, trying to block the item from opening a new page
                        item.classList.add("ancestor-active");
                        if (item.dataset.href) {
                            const url = item.dataset.href;
                            console.error(url);
                            this.contentTarget.innerText = "Loading ..." + url;

                            fetch(url)
                                .then(response => response.text())
                                .then(html => {
                                    this.contentTarget.innerHTML = html;
                                })
                                .catch(error => {
                                    this.contentTarget.innerHTML = error.toString();
                                    console.error('Error:', error);
                                });
                        }

                        // Example of dynamic list creation.
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
                    }
                );
        });

        // e = this.playground();
        const e = this.advanced();
        // const e = this.basic();
        const api = e.API;
        api.open();

        // Open the sidebar, depending on the page (or class?)
        // api.open();
        // const panel = document.querySelector( "#my-panel" );
        // api.openPanel( panel );

        // this.msgTarget.innerHTML = 'Hello Stimulus!';
    }

    advanced() {
        this.msgTarget.innerText = "Initializing mmenu...";
        console.time("mmenu");
        var e = new Mmenu(
            this.treeTarget,
            {
                extensions: ['theme-dark'], // , 'shadow-page'
                setSelected: true,
                slidingSubmenus: true,
                counters: true,
                searchfield: {
                    placeholder: 'Search menu items',
                },
                iconbar: {
                    use: '(min-width: 450px)',
                    top: [
                        '<a href="/"><span class="fa fa-home"></span></a>',
                        '<a href="#/"><span class="fa fa-university"></span></a>',
                    ],
                    bottom: [
                        '<a href="#/"><span class="fab fa-twitter"></span></a>',
                        '<a href="#/"><span class="fab fa-facebook"></span></a>',
                        '<a href="#/"><span class="fab fa-youtube"></span></a>',
                    ],
                },
                sidebar: {
                    collapsed: {
                        use: '(min-width: 450px)',
                        hideNavbar: false,
                    },
                    expanded: {
                        use: '(min-width: 992px)',
                    },
                },
                navbars: [
                    {
                        content: ['searchfield'],
                    },
                    {
                        type: 'tabs',
                        content: [
                            '<a href="#panel-ac"><i class="fas fa-bars"></i> <span>AC</span></a>',
                            // '<a href="#panel-menu"><i class="fa fa-bars"></i> <span>Demo</span></a>',
                            '<a href="#panel-account"><i class="fas fa-user"></i> <span>Account</span></a>',
                            // '<a href="#panel-cart"><i class="fa fa-shopping-cart"></i> <span>Cart</span></a>',
                        ],
                    },
                    {
                        content: ['prev', 'breadcrumbs', 'close'],
                    },
                    {
                        position: 'bottom',
                        content: [
                            '<a href="https://voxitour.com" target="_blank">(c)Voxitour.com</a>',
                        ],
                    },
                ],
            },
            {
                searchfield: {
                    clear: true,
                },
                navbars: {
                    breadcrumbs: {
                        removeFirst: true,
                    },
                },
            }
        );
        console.timeEnd('mmenu');

        return e;
    }
    tutorial() {
        Mmenu.configs.classNames.selected = "active";
        Mmenu.configs.offCanvas.page.selector = "#page";

                const menu = new Mmenu( this.treeTarget, {
                    slidingSubmenus: false,
                    extensions: ["theme-dark"]
                });
                return menu;
    }
    basic() {
        var e = new Mmenu( this.treeTarget, {
            slidingSubmenus: true,
            transitionDuration: 0.01,
            classNames: {
                selected: "active"
            },
            // "offCanvas": false,
            "extensions": [
                "pagedim-black",
                "theme-dark",
                // "fx-menu-slide",
                // "fx-panels-none",
            ]
        });
        return e;
    }

    playground() {
        var e = new Mmenu(this.treeTarget, {
                extensions: {
                    all: ["theme-white", "pagedim-black"],
                    "(max-width: 767px)": ["fx-menu-slide"]
                },
                wrappers: ["bootstrap"],
                hooks: {
                    "setSelected:before": (panel) => {
                        console.warn(panel);
                    },
                    "openPanel:start": ( panel ) => {

                        console.log( "Started opening pane: " + panel.id, panel );
                    },
                    "openPanel:finish": ( panel ) => {
                        console.log( "Finished opening panel: " + panel.id );
                    }
                },

                counters: !0,
                // iconPanels: {add: !0, hideDivider: !0, hideNavbar: !0, visible: "first"},
                keyboardNavigation: !0,
                navbar: {title: "mmenu"},
                navbars: [{position: "top", content: ["searchfield"]}, {position: "top"}],
                searchfield: {
                    panel: {
                        add: !0,
                        splash: '<p>What are you looking for?<br />Search the menu or try some of these popular pages:</p><a href="/examples.html">Advanced examples</a><br /><a href="/tutorials/off-canvas">Off-canvas tutorial</a><br /><a href="/download.html">Download the plugin</a><br /><a href="/wordpress-plugin">mmenu WordPress plugin</a><br /><br /><small>Documentation:</small><br .><a href="/docs/core/options.html">Options</a><br /><a href="/docs/extensions">Extensions</a><br /><a href="/docs/addons">Add-ons</a><br /><a href="/docs/core/api.html">API</a>'
                    }
                },
                setSelected: {hover: !0, parent: !0},
                sidebar: {
                    collapsed: {use: 480, hideNavbar: !0, hideDivider: !0},
                    expanded: {use: 800, initial: "remember"}
                }
            },
            {
                offCanvas: {page: {selector: "#page"}}, searchfield: {clear: !0}
            }).API,

            t = $("#hamburger").children(".mburger");

        e.bind("close:finish", function () {
            setTimeout(function () {
                t.attr("href", "#menu")
            }, 100)
        });

        e.bind("open:finish", function () {
            setTimeout(function () {
                t.attr("href", "#page")
            }, 100)
        })
        ;

        return e;
    }

    addListeners() {
        console.assert(this.contentTarget, "Missing contentTarget");
        this.treeTarget.addEventListener('click', (evnt) => {
        // this.treeTarget.querySelector('.mm-panels').addEventListener('click', (evnt) => {

            // this.treeTarget.querySelector('.mm-panels').addEventListener('click', (evnt) => {
            // var anchor = evnt.target.closest('a[href^="#/"]');
            var anchor = evnt.target.closest( 'a' );
            if (anchor) {

                var href = anchor.getAttribute("href"); // just path, use .href for full url
                // alert("Thank you for clicking, we will load " + href);
                console.log(anchor, anchor.closest('div'), href);
                // load relative links only.
                if (href.charAt(0) === '/') {
                    href += '?_partial=1';
                    evnt.preventDefault();

                    this.contentTarget.innerText = "Loading ..." + href;
                    this.msgTarget.innerHTML = `<a target="_blank" href="${href}">${href}</a>`;
                    // let url = new URL('https://example.com?foo=1&bar=2');
                    // let params = new URLSearchParams(url.search.slice(1));
                    // params.append('foo', 4);



                    fetch(href, {
                        redirect: 'follow',
                        mode: 'cors',
                        credentials: 'include'
                    })
                        .then(response => response.text() )
                        .then(html => {
                            // const htmlString = "<strong>Beware of the leopard</strong>";
                            this.contentTarget.innerHTML = "about to parse."
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, "text/html");
                            let content = doc.getElementById('html_content')?.innerHTML || html;
                            console.assert(content, "missing html_content element: " + html);

                            // target.replaceWith(element)

                            // let title = document.getElementsByName('title')[0];
                            let title = document.title;
                            console.error(title);

                            // seems like there should be a way to add the node directly, without overwriting the data-mmenu-target
                            this.contentTarget.innerHTML = content;
                            // this.contentTarget =  doc.getElementById('html_content');

                            // this.contentTarget.replaceWith(content);

                            document.title = doc.title;
                            // window.history.pushState({"html":response.html,"pageTitle":response.pageTitle},"", urlPath);

                        })
                        .catch(error => {
                            this.contentTarget.innerHTML = error.toString();
                            document.location = href;
                            console.error('Error:', error);
                        });
                }
            }
        });

    }


}
