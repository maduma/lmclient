define(["jquery", "../model/playerModel", "../view/mainView"],
    function($, PlayerModel, MainView) {
    var player = new PlayerModel();
    var global = {
        player: player,
        mainView : new MainView({el: $("span#player-uid"), model: player})
    };
    return global;
});