export default class Piece {
    constructor(player, icon, name) {
        this.player = player;
        this.style = { backgroundImage: `url('${icon}')` };
        this.name = name;
    }
}
