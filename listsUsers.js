class ListsUsers {
    static API = "https://jsonplaceholder.typicode.com";
    static CLASSES = {
        BUTTON: 'button',
        USER_NAME: 'username',
        USER_POSTS: 'user-posts',
        USER_TITLE: 'user-title',
        CONTAINER_USER: 'container-user',
    };

    static ENVIRONMENT = {
        USERS: {
            getUser: "/users",
        },
        POSTS: {
            getUserPost: "/posts?userId=",
        },
    };
    _mainContainer = null;
    _listData = null;

    constructor(className, listDataName) {
        this._mainContainer = className;
        this._listData = listDataName;
        this.init();
    };

    get onButtonClick() {
        return this._onButtonClick;
    };

    set onButtonClick(value) {
        this._onButtonClick = value;
    };

    init() {
        this.downloadUsers();
        this.setListener(this._mainContainer, 'click', this.onButtonClick);
    };

    getData(data, key) {
        return data.data[key];
    };

    setListener(element, event, callBack) {
        $(element).on(event, callBack);
    };

    createElements(listUsers) {
        listUsers.forEach(user => {
            this.createElement(user.name, this._mainContainer, 'div', ListsUsers.CLASSES.USER_NAME)
            this.createElementButton(this._mainContainer, 'button', ListsUsers.CLASSES.BUTTON, user.id);
        });
    };

    onButtonClick = (target) => {
        if (this.isButtonClick(target)) {
            return;
        };

        fetch(`${ListsUsers.API}${ListsUsers.ENVIRONMENT.POSTS.getUserPost}${target.target.id}`)
            .then((response) => response.json())
            .then((data) => {
                if (this.isEmptyListData()) {
                    this.clearListData();
                };
                return data;
            })
            .then((data) => data.forEach(element => {
                this.createElement(`${element.title}`, this._listData, 'div', ListsUsers.CLASSES.USER_TITLE);
                this.createElement(`${element.body}`, this._listData, 'div', ListsUsers.CLASSES.USER_POSTS);
            }));
    };

    downloadUsers = () => {
        fetch(`${ListsUsers.API}${ListsUsers.ENVIRONMENT.USERS.getUser}`)
            .then((response) => response.json())
            .then((listsUsers) => this.createElements(listsUsers))
    };

    createElement(data, containerEl, tag, classList) {
        const element = `<${ tag } class= ${ classList }>${ data }</${ tag }>`;
        $(element).appendTo(containerEl);
    };

    createElementButton(containerEl, tag, classList, Id) {
        const element = `<${ tag } class=${ classList } id=${ Id }> Show Posts</${ tag }>`;
        $(element).appendTo(containerEl);
    };

    isEmptyListData() {
        return this._listData.children.length !== 0;
    };

    isButtonClick(item) {
        return item.target.className !== ListsUsers.CLASSES.BUTTON;
    };

    clearListData() {
        this._listData[0].innerHTML = "";
    };
}