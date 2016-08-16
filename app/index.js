$(function () {
  var cards = [
    { _id: 1, left: 'Hard', right: 'Soft' },
    { _id: 2, left: 'City', right: 'Countryside' },
    { _id: 4, left: 'Tea', right: 'Coffee' },
    { _id: 8, left: 'Sea', right: 'Lake' },

    // { _id: 16, left: 'Hard', right: 'Soft' },
    // { _id: 32, left: 'City', right: 'Countryside' },
    // { _id: 64, left: 'Tea', right: 'Coffee' },
    // { _id: 128, left: 'Sea', right: 'Lake' },

    { _id: 256, left: 'Hard', right: 'Soft' },
    { _id: 512, left: 'City', right: 'Countryside' },
    { _id: 1024, left: 'Tea', right: 'Coffee' },
    { _id: 2048, left: 'Sea', right: 'Lake' },

    // { _id: 4096, left: 'Hard', right: 'Soft' },
    // { _id: 8192, left: 'City', right: 'Countryside' },
    // { _id: 16384, left: 'Tea', right: 'Coffee' },
    // { _id: 32768, left: 'Sea', right: 'Lake' },
    //
    { _id: 65536, left: 'Hard', right: 'Soft' },
    { _id: 131072, left: 'City', right: 'Countryside' },
    { _id: 262144, left: 'Tea', right: 'Coffee' },
    { _id: 524288, left: 'Sea', right: 'Lake' },

    // { _id: 1048576, left: 'Hard', right: 'Soft' },
    // { _id: 2097152, left: 'City', right: 'Countryside' },
    // { _id: 4194304, left: 'Tea', right: 'Coffee' },
    // { _id: 8388608, left: 'Sea', right: 'Lake' },
    //
    { _id: 16777216, left: 'Hard', right: 'Soft' },
    { _id: 33554432, left: 'City', right: 'Countryside' },
    { _id: 67108864, left: 'Tea', right: 'Coffee' },
    { _id: 134217728, left: 'Sea', right: 'Lake' },
    //
    // { _id: 268435456, left: 'Hard', right: 'Soft' },
    // { _id: 536870912, left: 'City', right: 'Countryside' },
    // { _id: 1073741824, left: 'Tea', right: 'Coffee' },
    // { _id: 2147483648, left: 'Sea', right: 'Lake' },

    { _id: 4294967296, left: 'Hard', right: 'Soft' },
    { _id: 8589934592, left: 'City', right: 'Countryside' },
  ];

  var getOctetColor = function (value, unit) {
    var octet = Math.floor(value / Math.pow(8, unit)) % 8;
    return 'hsl({{color}}, 50%, 80%)'.replace('{{color}}', octet * 45);
  };

  var initStateMachine = function () {
    var $states = $('.state');

    var currentStateIndex = -1;
    var $currentState = null;

    function nextState() {
      if(currentStateIndex > -1) {
        $currentState.hide();
      }

      currentStateIndex += 1;
      $currentState = $($states[currentStateIndex]);

      $currentState.show();
    }

    nextState();

    return {
      nextState: nextState
    };
  };

  var initCardStateMachine = function (cards, callback) {
    var cardDNA = 0;

    var currentCardIndex = -1;
    var currentCard = null;

    var $leftCard = $('#left-card');
    var $leftCardTitle = $('#left-card-title');
    var $rightCard = $('#right-card');
    var $rightCardTitle = $('#right-card-title');
    var $cardProcess = $('#card-process .content');

    var nextCard = function () {
      currentCardIndex += 1;

      if(currentCardIndex === cards.length) {
        callback(cardDNA);
        return false;
      }

      currentCard = cards[currentCardIndex];

      $leftCardTitle.text(currentCard.left);
      $rightCardTitle.text(currentCard.right);

      $cardProcess.text((currentCardIndex + 1) + ' / 34');
    };

    nextCard();

    $leftCard.click(function () {
      cardDNA += currentCard._id;
      nextCard();
    });

    $rightCard.click(function () {
      nextCard();
    });
  };

  var stateMachine = initStateMachine();

  $('#state-1').click(function () {
    stateMachine.nextState();
  });

  initCardStateMachine(cards, function (cardDNA) {
    var $dnaTable = $('#dna-table');
    var $dnaElement;

    for (var i = 0; i < 12; i++) {
      $dnaElement = $('<div/>', {
        class: 'dna-element',
        style: 'background: ' + getOctetColor(cardDNA, i),
      });

      $dnaTable.append($dnaElement);
    }

    stateMachine.nextState();
  });
});
