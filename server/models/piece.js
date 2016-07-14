function Piece({ color }) {
  if (!color) { return new Error('missing arguments'); }
  this.color = color;
  this.kinged = false;
  this.active = true;
}

module.exports = Piece;
