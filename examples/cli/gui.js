const term = require('terminal-kit').terminal;

// eslint-disable-next-line @typescript-eslint/no-empty-function
let interval = setInterval(() => {}, 1000);

term.windowTitle('AzurApi-JS v2 CLI GUI');
termResizeFunction(term.width, term.height);

term.on('resize', (w, h) => {
  termResizeFunction(w, h);
});

function termResizeFunction(w, h) {
  if (w < 80 || h < 24) {
    term.clear();
    term.moveTo(
      1,
      1,
      `Terminal size must be at least ^g80^:x^:^g24^ but is ${w < 80 ? '^r' : '^g'}%s^:x^:${h < 24 ? '^r' : '^g'}%d\n`,
      term.width,
      term.height
    );
  } else {
    term.clear();
  }
}
