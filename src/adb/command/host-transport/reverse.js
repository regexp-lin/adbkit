const Command = require('../../command');
const Protocol = require('../../protocol');

class ReverseCommand extends Command {
  execute(remote, local) {
    this._send(`reverse:forward:${remote};${local}`);
    return this.parser.readAscii(4)
      .then(reply => {
        switch (reply) {
          case Protocol.OKAY:
            return this.parser.readAscii(4)
              .then(reply => {
                switch (reply) {
                  case Protocol.OKAY:
                    return true;
                  case Protocol.FAIL:
                    return this.parser.readError();
                  default:
                    return this.parser.unexpected(reply, 'OKAY or FAIL');
                }
            });
          case Protocol.FAIL:
            return this.parser.readError();
          default:
            return this.parser.unexpected(reply, 'OKAY or FAIL');
        }
    });
  }
}

module.exports = ReverseCommand;
