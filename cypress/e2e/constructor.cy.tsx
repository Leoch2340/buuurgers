// Конфигурационные константы
const APP_CONFIG = {
  API_BASE_URL: Cypress.env('BURGER_API_URL'),
  SELECTORS: {
    EMPTY_BUN_TOP: '[data-cy=no_bun_text_1]',
    EMPTY_BUN_BOTTOM: '[data-cy=no_bun_text_2]',
    EMPTY_INGREDIENTS: '[data-cy=no_ingredients_text]',
    BUN_ADD_BUTTON: '[data-cy=bun_0] button',
    INGREDIENT_ADD_BUTTON: '[data-cy=ingredient_0] button',
    CONSTRUCTOR_AREA: '[data-cy=constructor_section]',
    INGREDIENT_ITEM: '[data-cy=ingredient_element]',
    INGREDIENT_MODAL: '[data-cy=ingredient_modal]',
    MODAL_CLOSE_BUTTON: '[data-cy=close_modal_btn]',
    ORDER_SUBMIT_BUTTON: '[data-cy=new_order_total] button',
    ORDER_NUMBER_DISPLAY: '[data-cy=new_order_number]',
    INGREDIENT_NAME_LIST: '[data-cy=ingredient_name]',
    INGREDIENT_NAME_MODAL: '[data-cy=modal_ingredient_name]',
    INGREDIENT_IMAGE: '[data-cy=ingredient]'
  },
  TEST_DATA: {
    USER_TOKEN: 'testToken',
    ACCESS_TOKEN: 'testAccessToken'
  }
};

// Настройка тестового окружения
function setupTestEnvironment() {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  
  window.localStorage.setItem('refreshToken', APP_CONFIG.TEST_DATA.USER_TOKEN);
  cy.setCookie('accessToken', APP_CONFIG.TEST_DATA.ACCESS_TOKEN);
  
  // Загрузка моковых данных
  cy.fixture('ingredients.json').then((data) => {
    cy.intercept('GET', `${APP_CONFIG.API_BASE_URL}/ingredients`, data).as('ingredientsRequest');
  });
  
  cy.fixture('orders.json').then((data) => {
    cy.intercept('GET', `${APP_CONFIG.API_BASE_URL}/orders/all`, data).as('ordersRequest');
  });
  
  cy.fixture('user.json').then((data) => {
    cy.intercept('GET', `${APP_CONFIG.API_BASE_URL}/auth/user`, data).as('userRequest');
  });
  
  cy.visit('/');
  cy.wait('@ingredientsRequest');
}

// Очистка после тестов
function cleanupAfterTest() {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
}

// Добавление ингредиентов в конструктор
function addIngredients() {
  cy.get(APP_CONFIG.SELECTORS.BUN_ADD_BUTTON).click();
  cy.get(APP_CONFIG.SELECTORS.INGREDIENT_ADD_BUTTON).click({ multiple: true });
}

// Проверка создания заказа
function testOrderCreation() {
  cy.fixture('newOrder.json').then((data) => {
    cy.intercept('POST', `${APP_CONFIG.API_BASE_URL}/orders`, data).as('orderRequest');
  });
  
  addIngredients();
  cy.get(APP_CONFIG.SELECTORS.ORDER_SUBMIT_BUTTON).click();
  
  cy.wait('@orderRequest').then((interception) => {
    const orderNumber = interception.response?.body.order.number;
    cy.get(APP_CONFIG.SELECTORS.ORDER_NUMBER_DISPLAY).should('contain', orderNumber);
  });
  
  cy.get(APP_CONFIG.SELECTORS.MODAL_CLOSE_BUTTON).click();
}

// Проверка модального окна ингредиента
function testIngredientModal() {
  cy.get(APP_CONFIG.SELECTORS.INGREDIENT_MODAL).should('not.exist');
  cy.get(APP_CONFIG.SELECTORS.INGREDIENT_IMAGE).first().click();
  cy.get(APP_CONFIG.SELECTORS.INGREDIENT_MODAL).should('be.visible');
  
  cy.get(APP_CONFIG.SELECTORS.INGREDIENT_NAME_LIST)
    .first()
    .invoke('text')
    .then((ingredientName) => {
      cy.get(APP_CONFIG.SELECTORS.INGREDIENT_NAME_MODAL)
        .invoke('text')
        .should('equal', ingredientName.trim());
    });
  
  cy.get(APP_CONFIG.SELECTORS.MODAL_CLOSE_BUTTON).click();
  cy.get(APP_CONFIG.SELECTORS.INGREDIENT_MODAL).should('not.exist');
}

// Основные тесты
describe('Тестирование конструктора бургеров', () => {
  beforeEach(setupTestEnvironment);
  afterEach(cleanupAfterTest);

  it('должен отображать пустой конструктор при инициализации', () => {
    cy.get(APP_CONFIG.SELECTORS.EMPTY_BUN_TOP).should('contain', 'Выберите булки');
    cy.get(APP_CONFIG.SELECTORS.EMPTY_BUN_BOTTOM).should('contain', 'Выберите булки');
    cy.get(APP_CONFIG.SELECTORS.EMPTY_INGREDIENTS).should('contain', 'Выберите начинку');
  });

  it('должен добавлять ингредиенты в конструктор', () => {
    addIngredients();
    
    cy.get(APP_CONFIG.SELECTORS.CONSTRUCTOR_AREA).should('contain', 'булка');
    cy.get(APP_CONFIG.SELECTORS.INGREDIENT_ITEM).should('exist');
  });

  it('должен создавать новый заказ', () => {
    testOrderCreation();
    
    // Проверка сброса конструктора после заказа
    cy.get(APP_CONFIG.SELECTORS.EMPTY_BUN_TOP).should('contain', 'Выберите булки');
    cy.get(APP_CONFIG.SELECTORS.EMPTY_BUN_BOTTOM).should('contain', 'Выберите булки');
    cy.get(APP_CONFIG.SELECTORS.EMPTY_INGREDIENTS).should('contain', 'Выберите начинку');
  });

  it('должен открывать и закрывать модальное окно ингредиента', () => {
    testIngredientModal();
  });
});

// Обработка неперехваченных исключений
Cypress.on('uncaught:exception', () => false);