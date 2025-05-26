// Получаем URL API из переменной окружения Cypress
const API_URL = Cypress.env('BURGER_API_URL');

// Объект с селекторами для элементов интерфейса
const SELECTORS = {
  NO_BUN_1: `[data-cy=no_bun_text_1]`, // Сообщение об отсутствии булки (верхнее)
  NO_BUN_2: `[data-cy=no_bun_text_2]`, // Сообщение об отсутствии булки (нижнее)
  NO_INGREDIENTS: `[data-cy=no_ingredients_text]`, // Сообщение об отсутствии ингредиентов
  ADD_BUN_BUTTON: `[data-cy=bun_0] button`, // Кнопка добавления первой булки
  ADD_INGREDIENT_BUTTON: `[data-cy=ingredient_0] button`, // Кнопка добавления первого ингредиента
  CONSTRUCTOR: `[data-cy=constructor_section]`, // Секция конструктора бургера
  INGREDIENT_ELEMENT: `[data-cy=ingredient_element]`, // Добавленный элемент ингредиента в конструктор
  INGREDIENT_MODAL: `[data-cy=ingredient_modal]`, // Модальное окно ингредиента
  MODAL_CLOSE: `[data-cy=close_modal_btn]`, // Кнопка закрытия модального окна
  ORDER_BUTTON: `[data-cy=new_order_total] button`, // Кнопка оформления заказа
  ORDER_NUMBER: `[data-cy=new_order_number]`, // Элемент отображения номера заказа
  INGREDIENT_NAME: `[data-cy=ingredient_name]`, // Название ингредиента в списке
  MODAL_INGREDIENT_NAME: `[data-cy=modal_ingredient_name]`, // Название ингредиента в модальном окне
  INGREDIENT: `[data-cy=ingredient]` // Элемент ингредиента в списке
};

// Отключаем выбрасывание исключений при неожиданных ошибках, чтобы тесты не падали
Cypress.on('uncaught:exception', () => false);

// Действия перед каждым тестом
beforeEach(() => {
  // Очищаем куки и localStorage
  cy.clearAllCookies();
  cy.clearAllLocalStorage();

  // Устанавливаем фиктивные токены авторизации
  window.localStorage.setItem('refreshToken', 'testRefreshToken');
  cy.setCookie('accessToken', 'testAccessToken');

  // Подменяем запрос к API ингредиентов данными из фикстуры
  cy.fixture('ingredients.json').then((ingredients) => {
    cy.intercept('GET', `${API_URL}/ingredients`, ingredients).as(
      'getIngredients'
    );
  });

  // Подменяем запрос к API заказов
  cy.fixture('orders.json').then((orders) => {
    cy.intercept('GET', `${API_URL}/orders/all`, orders).as('getOrders');
  });

  // Подменяем запрос к API пользователя
  cy.fixture('user.json').then((user) => {
    cy.intercept('GET', `${API_URL}/auth/user`, user).as('getUser');
  });

  // Открываем главную страницу и ждём загрузки ингредиентов
  cy.visit('/');
  cy.wait('@getIngredients');
});

// Действия после каждого теста
afterEach(() => {
  // Снова очищаем куки и localStorage
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
});

// Начало группы тестов
describe('Проверка работоспособности приложения', () => {

  // Тест: проверка добавления булки и ингредиента
  it('проверка добавления булки и ингредиента', () => {
    // Проверяем наличие сообщений о необходимости выбора ингредиентов
    cy.get(SELECTORS.NO_BUN_1).should('contain', 'Выберите булки');
    cy.get(SELECTORS.NO_BUN_2).should('contain', 'Выберите булки');
    cy.get(SELECTORS.NO_INGREDIENTS).should('contain', 'Выберите начинку');

    // Добавляем булку и ингредиенты
    cy.get(SELECTORS.ADD_BUN_BUTTON).click();
    cy.get(SELECTORS.ADD_INGREDIENT_BUTTON).click({ multiple: true });

    // Проверяем, что элементы добавлены в конструктор
    cy.get(SELECTORS.CONSTRUCTOR).should('contain', 'булка');
    cy.get(SELECTORS.INGREDIENT_ELEMENT).should('exist');
  });

  // Тест: проверка оформления нового заказа
  it('проверка нового заказа', () => {
    // Подменяем POST-запрос создания заказа
    cy.fixture('newOrder.json').then((newOrder) => {
      cy.intercept('POST', `${API_URL}/orders`, newOrder).as('newOrder');
    });

    // Добавляем булку и ингредиенты
    cy.get(SELECTORS.ADD_BUN_BUTTON).click();
    cy.get(SELECTORS.ADD_INGREDIENT_BUTTON).click({ multiple: true });

    // Нажимаем кнопку оформления заказа
    cy.get(SELECTORS.ORDER_BUTTON).click();

    // Ждём и проверяем, что номер заказа отображён
    cy.wait('@newOrder').then((interception) => {
      const orderNumber = interception.response?.body.order.number;
      cy.get(SELECTORS.ORDER_NUMBER).should('contain', orderNumber);
    });

    // Закрываем модальное окно заказа
    cy.get(SELECTORS.MODAL_CLOSE).click();

    // Проверяем, что после закрытия конструктор пуст
    cy.get(SELECTORS.NO_BUN_1).should('contain', 'Выберите булки');
    cy.get(SELECTORS.NO_BUN_2).should('contain', 'Выберите булки');
    cy.get(SELECTORS.NO_INGREDIENTS).should('contain', 'Выберите начинку');
  });

  // Тест: проверка открытия и закрытия модального окна ингредиента
  it('проверка работы модального окна ингредиента', () => {
    // Проверяем, что модального окна нет
    cy.get(SELECTORS.INGREDIENT_MODAL).should('not.exist');

    // Кликаем на первый ингредиент
    cy.get(SELECTORS.INGREDIENT).first().click();

    // Проверяем, что модалка появилась
    cy.get(SELECTORS.INGREDIENT_MODAL).should('be.visible');

    // Сравниваем название ингредиента в списке и в модалке
    cy.get(SELECTORS.INGREDIENT_NAME)
      .first()
      .then(($listName) => {
        const listIngredientName = $listName.text().trim();
        cy.get(SELECTORS.MODAL_INGREDIENT_NAME).then(($modalName) => {
          const modalIngredientName = $modalName.text().trim();
          expect(listIngredientName).to.equal(modalIngredientName);
        });
      });

    // Закрываем модалку и проверяем, что она исчезла
    cy.get(SELECTORS.MODAL_CLOSE).click();
    cy.get(SELECTORS.INGREDIENT_MODAL).should('not.exist');
  });
});
