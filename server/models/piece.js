function Piece({ row, col, color }) {
  if (!row || !col || !color) { return new Error('missing arguments'); }
  this.row = row;
  this.col = col;
  this.color = color;
  this.kinged = false;
  this.active = true;
}

module.exports = Piece;
