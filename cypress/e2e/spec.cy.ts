describe('check if navigation works and if pages render', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
    cy.wait(400);
    cy.get('p').contains('The next generation of technology');
    cy.wait(200);

    cy.get('header').find('button').click();
    cy.get('a').contains('Stack Builder').click();
    cy.get('button').contains('Next').click();
    cy.wait(200);
    cy.get('button').contains('Web App').and('be.visible');

    //cy.get('header').find('button').click();
    // cy.get('a').contains('Library').click();
    // cy.wait(200);
    // cy.get('li').contains('React').and('be.visible');

    // cy.get('header').find('button').click();
    // cy.get('a').contains('Compare').click();
    // cy.wait(200);
    // cy.get('h2').contains('Select First Technology').and('be.visible');
    cy.wait(200);
    cy.get('header').find('button').click();
    cy.get('a').contains('About').click();
    cy.wait(200);

    // cy.get('header').find('button').click();
    // cy.get('a').contains('Contact').click();

    cy.get('header').find('button').click();
    cy.get('a').contains('Home').click();

    cy.get('img');
    // cy.contains('Technology Library').click();

    // cy.get('header').find('a').click();
    // cy.get('img');
    cy.contains('PACKY StackBuilder').click();

    // cy.get('header').find('a').click();
    // cy.get('img');
    // cy.contains('Pricing & Information').click();
  });
});

describe('about page test', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
    cy.wait(400);
    cy.get('a').contains('Learn more').click();
    cy.wait(200);
    cy.get('h1').contains('About the app').and('be.visible');
    cy.get('a')
      .eq(1)
      .should(
        'have.attr',
        'href',
        'https://www.instagram.com/packy_ticorporate/'
      );

    cy.get('a')
      .eq(2)
      .should('have.attr', 'href', 'https://github.com/jamktiko/PACKY');
  });
});

// describe('technology library Test', () => {
//   it('passes', () => {
//     cy.visit('http://localhost:3000');
//     cy.wait(400);
//     cy.get('img');
//     cy.contains('Technology Library').click();
//     cy.wait(200);
//     cy.get("input[type='text']").type('React');
//     cy.get('li').contains('React').and('be.visible');
//     cy.get("input[type='text']").clear();

//     cy.get("input[type='text']").type('Svelte');
//     cy.get('li').contains('Svelte').and('be.visible');
//     cy.get("input[type='text']").clear().type('👻');
//     cy.get('p').contains('No data available').and('be.visible');
//   });
// });

describe('Stackbuilder Test', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
    cy.wait(400);
    cy.viewport(1550, 947);

    cy.contains('PACKY StackBuilder').click();
    cy.wait(1000);

    cy.get("input[type='text']").type('React');
    cy.get('li').contains('React').and('be.visible');
    cy.get("input[type='text']").clear();

    cy.get("input[type='text']").type('Svelte');
    cy.get('li').contains('Svelte').and('be.visible');
    cy.get("input[type='text']").clear().type('👻');
    cy.get('ul').should('not.visible');

    cy.get('button').contains('Next').click();
    cy.get('button').contains('Go back').click();
    cy.get('button').contains('Next').click();
    cy.get('button').eq(32).click();
    cy.get('button').contains('Authentication').click();
    cy.get('button').eq(31).click();

    //cy.get('div').contains('h1', 'Choose feature').click();
    cy.contains('h1', 'Choose feature')
      .parent('div')
      .within(() => {
        cy.get('button').click();
      });

    cy.get('button').contains('Finish').click();

    cy.wait(600);
    cy.get('html').trigger('mousedown', 775, 473);
    cy.get('html').trigger('mousemove', 375, 473);
    cy.get('html').trigger('mouseup');
    cy.wait(600);
    cy.get('html').trigger('mousedown', 375, 473);
    cy.get('html').trigger('mousemove', 775, 473);
    cy.get('html').trigger('mouseup');
    cy.wait(600);

    cy.get('button.slick-next').click();
    cy.wait(600);
    cy.get('button.slick-prev').click();

    cy.get('button.toggle-output').eq(3).click();

    cy.get('button').contains('Reset').click();

    cy.get('button').contains('Go back').click();

    cy.get('a')
      .contains('React')
      .should('have.attr', 'href', 'https://react.dev/');
    cy.get("input[type='checkbox']").check();
    cy.get("input[type='checkbox']").eq(1).uncheck();
    cy.get("input[type='checkbox']").uncheck();
  });
});

// //tests if the weigths count right
describe('Stackbuilder functionality test', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
    cy.wait(100);
    cy.viewport(1550, 947);

    cy.contains('PACKY StackBuilder').click();

    cy.get("input[type='text']").type('React');
    cy.get('li').contains('React').and('be.visible');
    cy.get("input[type='checkbox']").check();
    cy.get("input[type='text']").clear();

    cy.get("input[type='text']").type('Svelte');
    cy.get('li').contains('Svelte').and('be.visible');
    cy.get("input[type='checkbox']").check();
    cy.get("input[type='text']").clear().type('👻');
    cy.get('ul').should('not.visible');
    cy.get("input[type='text']").clear();

    cy.get('button').contains('Next').click();
    cy.get('button')
      .contains('Reset')
      .invoke('attr', 'disabled')
      .then((disabled) => {
        if (!disabled) {
          cy.get('button').contains('Reset').click();
        }
      });
    cy.get('button').eq(32).click();
    cy.get('button').contains('Authentication').click();
    cy.get('button').contains('Finish').click();
    cy.get("div[class='carousel-item']")
      .eq(0)
      .within(() => {
        cy.get('div').contains('Svelte').should('be.visible');
      });
    cy.get('button.toggle-output').eq(3).click();
    cy.get('button').contains('Go back').click();
    cy.get("input[type='checkbox']").check();
    cy.get('button').contains('Next').click();
    cy.get('button').contains('Finish').click();
    cy.get("div[class='carousel-item']")
      .eq(0)
      .within(() => {
        cy.get('div').contains('Total Weight: 1.1').should('be.visible');
      });
  });
});

describe('Stackbuilder functionality test 2', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/stackbuilder');

    cy.get('button').contains('Next').click();
    cy.get('button')
      .contains('Reset')
      .invoke('attr', 'disabled')
      .then((disabled) => {
        if (!disabled) {
          cy.get('button').contains('Reset').click();
        }
      });
    cy.get('button').eq(32).click();
    cy.get('button').contains('Authentication').click();
    cy.get('button').contains('Finish').click();
    cy.get("div[class='carousel-item']")
      .eq(0)
      .within(() => {
        cy.get('div').contains('React').should('be.visible');
      });
    cy.get('button.toggle-output').eq(3).click();
    //cy.get('button').contains('Go back').click();
    //cy.get("input[type='checkbox']").check();
    //cy.get('button').contains('Next').click();
    cy.get('button').contains('Finish').click();
    cy.get("div[class='carousel-item']")
      .eq(0)
      .within(() => {
        cy.get('div').contains('Total Weight: 0.1').should('be.visible');
      });
  });
});

describe('Stackbuilder functionality test 3', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/stackbuilder');

    cy.get('button').contains('Next').click();
    cy.get('button')
      .contains('Reset')
      .invoke('attr', 'disabled')
      .then((disabled) => {
        if (!disabled) {
          cy.get('button').contains('Reset').click();
        }
      });
    cy.get('button').eq(32).click();
    cy.get('button').contains('Authentication').click();
    cy.get('button').contains('Finish').click();
    cy.get("div[class='carousel-item']")
      .eq(0)
      .within(() => {
        cy.get('div').contains('React').should('be.visible');
      });
    cy.get('button.toggle-output').eq(3).click();
    cy.get('button').contains('Go back').click();
    cy.get("input[type='checkbox']").check();
    cy.get('button').contains('Next').click();
    cy.get('button').contains('Finish').click();
    cy.get("div[class='carousel-item']")
      .eq(0)
      .within(() => {
        cy.get('div').contains('Total Weight: 1.1').should('be.visible');
      });
  });
});
// kolmas joku jolla kattoo että tulee samat tulokset kun painaa samoja nappeja
describe('Stackbuilder functionality test 4', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/stackbuilder');

    cy.get('button').contains('Next').click();
    cy.get('button')
      .contains('Reset')
      .invoke('attr', 'disabled')
      .then((disabled) => {
        if (!disabled) {
          cy.get('button').contains('Reset').click();
        }
      });
    cy.get('button').eq(32).click();
    cy.get('button').contains('Authentication').click();
    cy.get('button').contains('Finish').click();
    cy.get("div[class='carousel-item']")
      .eq(0)
      .within(() => {
        cy.get('div').contains('React').should('be.visible');
      });
    cy.get('button.toggle-output').eq(3).click();
    cy.get('button').contains('Go back').click();
    cy.get("input[type='checkbox']").check();
    cy.get('button').contains('Next').click();
    cy.get('button').contains('Finish').click();
    cy.get("div[class='carousel-item']")
      .eq(0)
      .within(() => {
        cy.get('div').contains('Total Weight: 1.1').should('be.visible');
      });
  });
});

describe('Stackbuilder functionality test 5', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/stackbuilder');

    cy.get('button').contains('Next').click();
    cy.get('button')
      .contains('Reset')
      .invoke('attr', 'disabled')
      .then((disabled) => {
        if (!disabled) {
          cy.get('button').contains('Reset').click();
        }
      });
    cy.get('button').eq(32).click();
    cy.get('button').contains('Authentication').click();
    cy.get('button').eq(33).click();
    cy.get('button').contains('File Upload').click();
    cy.get('button').eq(34).click();
    cy.get('button').contains('Mobile-Friendly').click();
    cy.get('button').eq(35).click();
    cy.get('button').contains('Social Login').click();
    cy.get('button').eq(36).click();
    cy.get('button').contains('CRUD Operations').click();
    cy.get('button').eq(31).click();
    cy.get('button').contains('Search Functionality').click();
    cy.get('button').eq(30).click();
    cy.get('button').contains('Push Notifications').click();
    cy.get('button').eq(39).click();
    cy.get('button').contains('Dark Mode').click();
    cy.get('button').eq(40).click();
    cy.get('button').contains('Analytics').click();
    cy.get('button').eq(42).click();
    cy.get('button').contains('Search Engine Optimization').click();
    cy.get('button').contains('Finish').click();
    cy.wait(4000);

    cy.get("div[class='carousel-item']")
      .eq(0)
      .within(() => {
        cy.get('div').contains('React').should('be.visible');
      });
    cy.get('button.toggle-output').eq(3).click();
    cy.get('button').contains('Go back').click();
    cy.get("input[type='checkbox']").check();
    cy.get('button').contains('Next').click();
    cy.get('button').contains('Finish').click();
    cy.get("div[class='carousel-item']")
      .eq(0)
      .within(() => {
        cy.get('div').contains('Total Weight: 9.9').should('be.visible');
      });
  });
});
