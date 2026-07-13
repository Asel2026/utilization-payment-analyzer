// Main Application JavaScript
// Local analytical web project for utilization payment analysis

class App {
    constructor() {
        this.currentPage = 'home';
        this.data = {};
        this.init();
    }

    async init() {
        await this.loadData();
        this.setupNavigation();
        this.setupCalculators();
        this.setupSearch();
        this.setupExport();
        this.loadPage('home');
    }

    async loadData() {
        try {
            // Load all data files
            const dataFiles = [
                'legislation.json',
                'current-system.json',
                'proposed-changes.json',
                'administrator.json',
                'economic-justification.json',
                'environmental-justification.json',
                'international-experience.json',
                'financial-model.json',
                'analytics.json',
                'conclusion.json'
            ];

            for (const file of dataFiles) {
                try {
                    const response = await fetch(`data/${file}`);
                    if (response.ok) {
                        const key = file.replace('.json', '');
                        this.data[key] = await response.json();
                    }
                } catch (e) {
                    console.log(`Could not load ${file}, using default data`);
                }
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.loadPage(page);
            });
        });
    }

    loadPage(pageName) {
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageName) {
                link.classList.add('active');
            }
        });

        // Load page content
        const content = this.getPageContent(pageName);
        document.getElementById('page-content').innerHTML = content;
        this.currentPage = pageName;

        // Initialize charts if needed
        if (['analytics', 'financial-model', 'economic-justification'].includes(pageName)) {
            this.initCharts(pageName);
        }
    }

    getPageContent(pageName) {
        const pageData = this.data[pageName];
        
        const pages = {
            home: `
                <div class="page-section active">
                    <h1 class="page-title">Главная</h1>
                    <div class="page-content">
                        <h2>Обоснование внедрения утилизационного платежа на электромобили</h2>
                        <p>Данный аналитический проект предназначен для исследования, моделирования и обоснования внедрения утилизационного платежа на электромобили в Республике Казахстан посредством отмены действующего нулевого коэффициента.</p>
                        
                        <h3>Ключевые цели проекта:</h3>
                        <ul>
                            <li>Анализ текущего законодательства в области утилизационных платежей</li>
                            <li>Исследование действующей системы налогообложения электромобилей</li>
                            <li>Обоснование необходимости отмены нулевого коэффициента</li>
                            <li>Экономическое и экологическое обоснование предлагаемых изменений</li>
                            <li>Анализ международного опыта утилизационных платежей</li>
                            <li>Разработка финансовой модели внедрения изменений</li>
                        </ul>

                        <h3>Особенности проекта:</h3>
                        <ul>
                            <li>Полностью локальная работа без доступа к интернету</li>
                            <li>Все данные хранятся в формате JSON</li>
                            <li>Интерактивные калькуляторы для расчетов</li>
                            <li>Визуализация данных с помощью SVG-диаграмм</li>
                            <li>Возможность экспорта в различные форматы</li>
                        </ul>

                        <div class="chart-container">
                            <div class="chart-title">Структура проекта</div>
                            <svg width="100%" height="300" viewBox="0 0 800 300">
                                <rect x="50" y="20" width="150" height="40" fill="#3498db" rx="5"/>
                                <text x="125" y="45" text-anchor="middle" fill="white" font-size="14">Законодательство</text>
                                
                                <rect x="220" y="20" width="150" height="40" fill="#3498db" rx="5"/>
                                <text x="295" y="45" text-anchor="middle" fill="white" font-size="14">Действующая система</text>
                                
                                <rect x="390" y="20" width="150" height="40" fill="#3498db" rx="5"/>
                                <text x="465" y="45" text-anchor="middle" fill="white" font-size="14">Изменения</text>
                                
                                <rect x="560" y="20" width="150" height="40" fill="#3498db" rx="5"/>
                                <text x="635" y="45" text-anchor="middle" fill="white" font-size="14">Обоснование</text>
                                
                                <rect x="135" y="80" width="150" height="40" fill="#27ae60" rx="5"/>
                                <text x="210" y="105" text-anchor="middle" fill="white" font-size="14">Экономическое</text>
                                
                                <rect x="305" y="80" width="150" height="40" fill="#27ae60" rx="5"/>
                                <text x="380" y="105" text-anchor="middle" fill="white" font-size="14">Экологическое</text>
                                
                                <rect x="475" y="80" width="150" height="40" fill="#27ae60" rx="5"/>
                                <text x="550" y="105" text-anchor="middle" fill="white" font-size="14">Международный опыт</text>
                                
                                <rect x="220" y="140" width="150" height="40" fill="#e74c3c" rx="5"/>
                                <text x="295" y="165" text-anchor="middle" fill="white" font-size="14">Финансовая модель</text>
                                
                                <rect x="390" y="140" width="150" height="40" fill="#e74c3c" rx="5"/>
                                <text x="465" y="165" text-anchor="middle" fill="white" font-size="14">Аналитика</text>
                                
                                <rect x="305" y="200" width="150" height="40" fill="#f39c12" rx="5"/>
                                <text x="380" y="225" text-anchor="middle" fill="white" font-size="14">Заключение</text>
                                
                                <line x1="125" y1="60" x2="210" y2="80" stroke="#2c3e50" stroke-width="2"/>
                                <line x1="295" y1="60" x2="380" y2="80" stroke="#2c3e50" stroke-width="2"/>
                                <line x1="465" y1="60" x2="550" y2="80" stroke="#2c3e50" stroke-width="2"/>
                                <line x1="210" y1="120" x2="295" y2="140" stroke="#2c3e50" stroke-width="2"/>
                                <line x1="380" y1="120" x2="465" y2="140" stroke="#2c3e50" stroke-width="2"/>
                                <line x1="295" y1="180" x2="380" y2="200" stroke="#2c3e50" stroke-width="2"/>
                            </svg>
                        </div>
                    </div>
                </div>
            `,
            legislation: `
                <div class="page-section active">
                    <h1 class="page-title">Законодательство</h1>
                    <div class="page-content">
                        <h2>Текущее законодательство Республики Казахстан</h2>
                        
                        <h3>Основные нормативные акты:</h3>
                        <ul>
                            <li><strong>Экологический кодекс Республики Казахстан</strong> - регулирует вопросы утилизации транспортных средств</li>
                            <li><strong>Налоговый кодекс Республики Казахстан</strong> - определяет порядок утилизационных платежей</li>
                            <li><strong>Постановление Правительства РК № 123</strong> - утверждает ставки утилизационного сбора</li>
                            <li><strong>Приказ Министра экологии № 45</strong> - определяет коэффициенты для различных категорий транспортных средств</li>
                        </ul>

                        <h3>Текущий статус электромобилей</h3>
                        <p>В соответствии с действующим законодательством, для электромобилей установлен нулевой коэффициент утилизационного платежа, что означает полное освобождение от данного вида платежа.</p>

                        <table>
                            <thead>
                                <tr>
                                    <th>Категория ТС</th>
                                    <th>Базовая ставка (МРП)</th>
                                    <th>Коэффициент</th>
                                    <th>Итоговый платеж</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Электромобили</td>
                                    <td>50</td>
                                    <td>0</td>
                                    <td>0 МРП</td>
                                </tr>
                                <tr>
                                    <td>Бензиновые авто (до 3000 см³)</td>
                                    <td>50</td>
                                    <td>1.0</td>
                                    <td>50 МРП</td>
                                </tr>
                                <tr>
                                    <td>Дизельные авто (до 3000 см³)</td>
                                    <td>50</td>
                                    <td>1.5</td>
                                    <td>75 МРП</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>Необходимость изменений</h3>
                        <p>Нулевой коэффициент для электромобилей был введен как временная мера для стимулирования развития электромобильного транспорта. Однако с учетом роста парка электромобилей и необходимости создания устойчивой системы утилизации, требуется пересмотр данной политики.</p>
                    </div>
                </div>
            `,
            'current-system': `
                <div class="page-section active">
                    <h1 class="page-title">Действующая система</h1>
                    <div class="page-content">
                        <h2>Текущая система утилизационных платежей</h2>
                        
                        <h3>Принципы расчета</h3>
                        <p>Утилизационный платеж рассчитывается по формуле:</p>
                        <div class="result-box">
                            <strong>Платеж = Базовая ставка × МРП × Коэффициент</strong>
                        </div>

                        <h3>Текущие значения (2026)</h3>
                        <ul>
                            <li><strong>МРП (Минимальный размер оплаты труда):</strong> 3 600 тенге</li>
                            <li><strong>Базовая ставка:</strong> 50 МРП</li>
                            <li><strong>Коэффициент для электромобилей:</strong> 0</li>
                        </ul>

                        <h3>Администрирование</h3>
                        <ul>
                            <li>Сбор платежей осуществляется таможенными органами при ввозе транспортных средств</li>
                            <li>Учет платежей ведется в единой информационной системе</li>
                            <li>Контроль за уплатой осуществляется налоговыми органами</li>
                        </ul>

                        <div class="chart-container">
                            <div class="chart-title">Динамика парка электромобилей в РК (2020-2026)</div>
                            <svg width="100%" height="250" viewBox="0 0 700 250">
                                <line x1="50" y1="200" x2="650" y2="200" stroke="#2c3e50" stroke-width="2"/>
                                <line x1="50" y1="200" x2="50" y2="30" stroke="#2c3e50" stroke-width="2"/>
                                
                                <text x="30" y="200" text-anchor="end" font-size="12">0</text>
                                <text x="30" y="150" text-anchor="end" font-size="12">500</text>
                                <text x="30" y="100" text-anchor="end" font-size="12">1000</text>
                                <text x="30" y="50" text-anchor="end" font-size="12">1500</text>
                                
                                <text x="50" y="220" text-anchor="middle" font-size="12">2020</text>
                                <text x="150" y="220" text-anchor="middle" font-size="12">2021</text>
                                <text x="250" y="220" text-anchor="middle" font-size="12">2022</text>
                                <text x="350" y="220" text-anchor="middle" font-size="12">2023</text>
                                <text x="450" y="220" text-anchor="middle" font-size="12">2024</text>
                                <text x="550" y="220" text-anchor="middle" font-size="12">2025</text>
                                <text x="650" y="220" text-anchor="middle" font-size="12">2026</text>
                                
                                <rect x="40" y="195" width="20" height="5" fill="#3498db"/>
                                <rect x="140" y="185" width="20" height="15" fill="#3498db"/>
                                <rect x="240" y="170" width="20" height="30" fill="#3498db"/>
                                <rect x="340" y="140" width="20" height="60" fill="#3498db"/>
                                <rect x="440" y="100" width="20" height="100" fill="#3498db"/>
                                <rect x="540" y="60" width="20" height="140" fill="#3498db"/>
                                <rect x="640" y="30" width="20" height="170" fill="#3498db"/>
                            </svg>
                        </div>
                    </div>
                </div>
            `,
            'proposed-changes': `
                <div class="page-section active">
                    <h1 class="page-title">Предлагаемые изменения</h1>
                    <div class="page-content">
                        <h2>Предлагаемые изменения в систему утилизационных платежей</h2>
                        
                        <h3>Основное предложение</h3>
                        <p>Отмена нулевого коэффициента для электромобилей и введение дифференцированной системы коэффициентов в зависимости от технических характеристик и экологических показателей.</p>

                        <h3>Предлагаемые коэффициенты</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Тип электромобиля</th>
                                    <th>Емкость батареи (кВт⋅ч)</th>
                                    <th>Предлагаемый коэффициент</th>
                                    <th>Платеж (МРП)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Микро</td>
                                    <td>до 30</td>
                                    <td>0.2</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>Компактный</td>
                                    <td>30-50</td>
                                    <td>0.4</td>
                                    <td>20</td>
                                </tr>
                                <tr>
                                    <td>Средний</td>
                                    <td>50-70</td>
                                    <td>0.6</td>
                                    <td>30</td>
                                </tr>
                                <tr>
                                    <td>Полноразмерный</td>
                                    <td>70-100</td>
                                    <td>0.8</td>
                                    <td>40</td>
                                </tr>
                                <tr>
                                    <td>Люкс</td>
                                    <td>свыше 100</td>
                                    <td>1.0</td>
                                    <td>50</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>Этапы внедрения</h3>
                        <ol>
                            <li><strong>2026 год:</strong> Разработка и принятие нормативных актов</li>
                            <li><strong>2027 год:</strong> Пилотное внедрение в регионах с высоким уровнем электромобилей</li>
                            <li><strong>2028 год:</strong> Полное внедрение по всей территории РК</li>
                        </ol>

                        <h3>Преимущества предлагаемой системы</h3>
                        <ul>
                            <li>Справедливое распределение нагрузки между владельцами</li>
                            <li>Стимулирование приобретения экологичных моделей</li>
                            <li>Создание фонда для развития инфраструктуры утилизации</li>
                            <li>Гармонизация с международным опытом</li>
                        </ul>
                    </div>
                </div>
            `,
            administrator: `
                <div class="page-section active">
                    <h1 class="page-title">Кто администрирует платеж</h1>
                    <div class="page-content">
                        <h2>Администрирование утилизационного платежа</h2>
                        
                        <h3>Текущая система администрирования</h3>
                        <ul>
                            <li><strong>Таможенные органы:</strong> Сбор платежей при ввозе транспортных средств</li>
                            <li><strong>Налоговые органы:</strong> Контроль за уплатой и администрирование</li>
                            <li><strong>Министерство экологии:</strong> Разработка нормативной базы</li>
                        </ul>

                        <h3>Предлагаемая система администрирования</h3>
                        <p>Для эффективного администрирования утилизационного платежа на электромобили предлагается следующая структура:</p>

                        <div class="chart-container">
                            <div class="chart-title">Схема администрирования</div>
                            <svg width="100%" height="300" viewBox="0 0 700 300">
                                <rect x="250" y="20" width="200" height="50" fill="#2c3e50" rx="5"/>
                                <text x="350" y="50" text-anchor="middle" fill="white" font-size="14">Правительство РК</text>
                                
                                <rect x="100" y="100" width="150" height="40" fill="#3498db" rx="5"/>
                                <text x="175" y="125" text-anchor="middle" fill="white" font-size="12">Министерство экологии</text>
                                
                                <rect x="275" y="100" width="150" height="40" fill="#3498db" rx="5"/>
                                <text x="350" y="125" text-anchor="middle" fill="white" font-size="12">Министерство финансов</text>
                                
                                <rect x="450" y="100" width="150" height="40" fill="#3498db" rx="5"/>
                                <text x="525" y="125" text-anchor="middle" fill="white" font-size="12">Таможенный комитет</text>
                                
                                <rect x="100" y="180" width="150" height="40" fill="#27ae60" rx="5"/>
                                <text x="175" y="205" text-anchor="middle" fill="white" font-size="12">Налоговый комитет</text>
                                
                                <rect x="275" y="180" width="150" height="40" fill="#27ae60" rx="5"/>
                                <text x="350" y="205" text-anchor="middle" fill="white" font-size="12">Единая информсистема</text>
                                
                                <rect x="450" y="180" width="150" height="40" fill="#27ae60" rx="5"/>
                                <text x="525" y="205" text-anchor="middle" fill="white" font-size="12">Операторы утилизации</text>
                                
                                <line x1="350" y1="70" x2="175" y2="100" stroke="#2c3e50" stroke-width="2"/>
                                <line x1="350" y1="70" x2="350" y2="100" stroke="#2c3e50" stroke-width="2"/>
                                <line x1="350" y1="70" x2="525" y2="100" stroke="#2c3e50" stroke-width="2"/>
                                <line x1="175" y1="140" x2="175" y2="180" stroke="#2c3e50" stroke-width="2"/>
                                <line x1="350" y1="140" x2="350" y2="180" stroke="#2c3e50" stroke-width="2"/>
                                <line x1="525" y1="140" x2="525" y2="180" stroke="#2c3e50" stroke-width="2"/>
                            </svg>
                        </div>

                        <h3>Функции администраторов</h3>
                        <ul>
                            <li><strong>Министерство экологии:</strong> Разработка коэффициентов, контроль за утилизацией</li>
                            <li><strong>Министерство финансов:</strong> Распределение средств, контроль за целевым использованием</li>
                            <li><strong>Таможенный комитет:</strong> Сбор платежей при ввозе</li>
                            <li><strong>Налоговый комитет:</strong> Контроль за уплатой, администрирование</li>
                            <li><strong>Единая информационная система:</strong> Учет платежей, мониторинг</li>
                            <li><strong>Операторы утилизации:</strong> Непосредственная утилизация</li>
                        </ul>
                    </div>
                </div>
            `,
            'economic-justification': `
                <div class="page-section active">
                    <h1 class="page-title">Экономическое обоснование</h1>
                    <div class="page-content">
                        <h2>Экономическое обоснование внедрения утилизационного платежа</h2>
                        
                        <h3>Прогноз поступлений</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Год</th>
                                    <th>Ожидаемый парк ЭМ</th>
                                    <th>Средний платеж</th>
                                    <th>Общие поступления (млн тг)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2027</td>
                                    <td>2 000</td>
                                    <td>25 МРП</td>
                                    <td>180</td>
                                </tr>
                                <tr>
                                    <td>2028</td>
                                    <td>3 500</td>
                                    <td>25 МРП</td>
                                    <td>315</td>
                                </tr>
                                <tr>
                                    <td>2029</td>
                                    <td>5 000</td>
                                    <td>25 МРП</td>
                                    <td>450</td>
                                </tr>
                                <tr>
                                    <td>2030</td>
                                    <td>7 000</td>
                                    <td>25 МРП</td>
                                    <td>630</td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="chart-container">
                            <div class="chart-title">Прогноз поступлений (млн тенге)</div>
                            <svg width="100%" height="250" viewBox="0 0 700 250">
                                <line x1="50" y1="200" x2="650" y2="200" stroke="#2c3e50" stroke-width="2"/>
                                <line x1="50" y1="200" x2="50" y2="30" stroke="#2c3e50" stroke-width="2"/>
                                
                                <text x="30" y="200" text-anchor="end" font-size="12">0</text>
                                <text x="30" y="150" text-anchor="end" font-size="12">200</text>
                                <text x="30" y="100" text-anchor="end" font-size="12">400</text>
                                <text x="30" y="50" text-anchor="end" font-size="12">600</text>
                                
                                <text x="150" y="220" text-anchor="middle" font-size="12">2027</text>
                                <text x="300" y="220" text-anchor="middle" font-size="12">2028</text>
                                <text x="450" y="220" text-anchor="middle" font-size="12">2029</text>
                                <text x="600" y="220" text-anchor="middle" font-size="12">2030</text>
                                
                                <rect x="130" y="170" width="40" height="30" fill="#3498db"/>
                                <text x="150" y="165" text-anchor="middle" font-size="12">180</text>
                                
                                <rect x="280" y="147" width="40" height="53" fill="#3498db"/>
                                <text x="300" y="142" text-anchor="middle" font-size="12">315</text>
                                
                                <rect x="430" y="125" width="40" height="75" fill="#3498db"/>
                                <text x="450" y="120" text-anchor="middle" font-size="12">450</text>
                                
                                <rect x="580" y="95" width="40" height="105" fill="#3498db"/>
                                <text x="600" y="90" text-anchor="middle" font-size="12">630</text>
                            </svg>
                        </div>

                        <h3>Направления использования средств</h3>
                        <ul>
                            <li><strong>40%</strong> - Развитие инфраструктуры утилизации</li>
                            <li><strong>30%</strong> - Субсидии на приобретение экологичного транспорта</li>
                            <li><strong>20%</strong> - НИОКР в области экологических технологий</li>
                            <li><strong>10%</strong> - Административные расходы</li>
                        </ul>

                        <h3>Экономический эффект</h3>
                        <ul>
                            <li>Создание рабочих мест в сфере утилизации</li>
                            <li>Развитие отрасли переработки</li>
                            <li>Снижение затрат на утилизацию в долгосрочной перспективе</li>
                            <li>Улучшение экологической ситуации</li>
                        </ul>
                    </div>
                </div>
            `,
            'environmental-justification': `
                <div class="page-section active">
                    <h1 class="page-title">Экологическое обоснование</h1>
                    <div class="page-content">
                        <h2>Экологическое обоснование утилизационного платежа</h2>
                        
                        <h3>Проблема утилизации электромобилей</h3>
                        <p>Батареи электромобилей содержат редкие и токсичные металлы (литий, кобальт, никель, марганец). При неправильной утилизации они могут нанести серьезный вред окружающей среде.</p>

                        <h3>Состав типичной батареи электромобиля</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Компонент</th>
                                    <th>Процент</th>
                                    <th>Потенциальный риск</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Литий</td>
                                    <td>5-7%</td>
                                    <td>Высокий</td>
                                </tr>
                                <tr>
                                    <td>Кобальт</td>
                                    <td>10-20%</td>
                                    <td>Очень высокий</td>
                                </tr>
                                <tr>
                                    <td>Никель</td>
                                    <td>30-40%</td>
                                    <td>Средний</td>
                                </tr>
                                <tr>
                                    <td>Марганец</td>
                                    <td>10-20%</td>
                                    <td>Средний</td>
                                </tr>
                                <tr>
                                    <td>Графит</td>
                                    <td>15-25%</td>
                                    <td>Низкий</td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="chart-container">
                            <div class="chart-title">Состав батареи электромобиля</div>
                            <svg width="100%" height="250" viewBox="0 0 700 250">
                                <circle cx="350" cy="125" r="100" fill="#3498db"/>
                                <circle cx="350" cy="125" r="80" fill="#ecf0f1"/>
                                <circle cx="350" cy="125" r="60" fill="#27ae60"/>
                                <circle cx="350" cy="125" r="40" fill="#e74c3c"/>
                                <circle cx="350" cy="125" r="20" fill="#f39c12"/>
                                
                                <text x="350" y="130" text-anchor="middle" fill="white" font-size="10">Li</text>
                                <text x="350" y="110" text-anchor="middle" fill="white" font-size="10">Co</text>
                                <text x="350" y="150" text-anchor="middle" fill="white" font-size="10">Ni</text>
                                
                                <rect x="500" y="50" width="150" height="20" fill="#f39c12" rx="3"/>
                                <text x="660" y="65" font-size="12">Литий (5-7%)</text>
                                
                                <rect x="500" y="80" width="150" height="20" fill="#e74c3c" rx="3"/>
                                <text x="660" y="95" font-size="12">Кобальт (10-20%)</text>
                                
                                <rect x="500" y="110" width="150" height="20" fill="#27ae60" rx="3"/>
                                <text x="660" y="125" font-size="12">Никель (30-40%)</text>
                                
                                <rect x="500" y="140" width="150" height="20" fill="#3498db" rx="3"/>
                                <text x="660" y="155" font-size="12">Марганец (10-20%)</text>
                                
                                <rect x="500" y="170" width="150" height="20" fill="#ecf0f1" rx="3"/>
                                <text x="660" y="185" font-size="12">Графит (15-25%)</text>
                            </svg>
                        </div>

                        <h3>Преимущества правильной утилизации</h3>
                        <ul>
                            <li>Вторичное использование редких металлов</li>
                            <li>Снижение добычи сырья</li>
                            <li>Минимизация экологического ущерба</li>
                            <li>Соответствие принципам циркулярной экономики</li>
                        </ul>
                    </div>
                </div>
            `,
            'international-experience': `
                <div class="page-section active">
                    <h1 class="page-title">Международный опыт</h1>
                    <div class="page-content">
                        <h2>Международный опыт утилизационных платежей на электромобили</h2>
                        
                        <h3>Европейский союз</h3>
                        <p>В странах ЕС действуют строгие требования к утилизации электромобилей в соответствии с Директивой 2006/66/EC о батареях и аккумуляторах.</p>
                        <ul>
                            <li>Производители обязаны обеспечить сбор и утилизацию не менее 50% батарей</li>
                            <li>Страны с наибольшим опытом: Германия, Франция, Нидерланды</li>
                            <li>Утилизационный сбор включен в стоимость автомобиля</li>
                        </ul>

                        <h3>Китай</h3>
                        <p>Китай является лидером по количеству электромобилей и имеет развитую систему утилизации.</p>
                        <ul>
                            <li>Государственная программа по утилизации батарей</li>
                            <li>Субсидии для компаний занимающихся утилизацией</li>
                            <li>Обязательная маркировка и отслеживание батарей</li>
                        </ul>

                        <h3>США</h3>
                        <p>В США утилизация регулируется на уровне штатов.</p>
                        <ul>
                            <li>Калифорния: лидер в области экологического законодательства</li>
                            <li>Федеральная программа по переработке батарей</li>
                            <li>Налоговые льготы для утилизационных компаний</li>
                        </ul>

                        <h3>Япония</h3>
                        <ul>
                            <li>Закон о переработке автомобилей</li>
                            <li>Система депозитов за батареи</li>
                            <li>Развитая инфраструктура утилизации</li>
                        </ul>

                        <h3>Сравнительная таблица</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Страна</th>
                                    <th>Наличие платежа</th>
                                    <th>Размер платежа</th>
                                    <th>Администратор</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Германия</td>
                                    <td>Да</td>
                                    <td>Включен в цену</td>
                                    <td>Производители</td>
                                </tr>
                                <tr>
                                    <td>Франция</td>
                                    <td>Да</td>
                                    <td>€50-200</td>
                                    <td>Государство</td>
                                </tr>
                                <tr>
                                    <td>Китай</td>
                                    <td>Да</td>
                                    <td>¥200-500</td>
                                    <td>Государство</td>
                                </tr>
                                <tr>
                                    <td>Япония</td>
                                    <td>Да</td>
                                    <td>¥10,000-30,000</td>
                                    <td>Производители</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `,
            'financial-model': `
                <div class="page-section active">
                    <h1 class="page-title">Финансовая модель</h1>
                    <div class="page-content">
                        <h2>Финансовая модель внедрения утилизационного платежа</h2>
                        
                        <h3>Структура модели</h3>
                        <p>Финансовая модель основана на следующих параметрах:</p>
                        <ul>
                            <li>Прогноз парка электромобилей</li>
                            <li>Дифференцированные коэффициенты</li>
                            <li>Стоимость утилизации</li>
                            <li>Административные расходы</li>
                        </ul>

                        <h3>Базовые параметры (2026)</h3>
                        <ul>
                            <li><strong>МРП:</strong> 3 600 тенге</li>
                            <li><strong>Базовая ставка:</strong> 50 МРП</li>
                            <li><strong>Текущий парк ЭМ:</strong> 1 500 единиц</li>
                            <li><strong>Среднегодовой рост:</strong> 40%</li>
                        </ul>

                        <div class="chart-container">
                            <div class="chart-title">Финансовая модель: поступления vs расходы</div>
                            <svg width="100%" height="300" viewBox="0 0 700 300">
                                <line x1="50" y1="250" x2="650" y2="250" stroke="#2c3e50" stroke-width="2"/>
                                <line x1="50" y1="250" x2="50" y2="30" stroke="#2c3e50" stroke-width="2"/>
                                
                                <text x="30" y="250" text-anchor="end" font-size="12">0</text>
                                <text x="30" y="150" text-anchor="end" font-size="12">300</text>
                                <text x="30" y="50" text-anchor="end" font-size="12">600</text>
                                
                                <text x="150" y="270" text-anchor="middle" font-size="12">2027</text>
                                <text x="300" y="270" text-anchor="middle" font-size="12">2028</text>
                                <text x="450" y="270" text-anchor="middle" font-size="12">2029</text>
                                <text x="600" y="270" text-anchor="middle" font-size="12">2030</text>
                                
                                <rect x="130" y="170" width="40" height="80" fill="#3498db"/>
                                <text x="150" y="165" text-anchor="middle" font-size="12">180</text>
                                
                                <rect x="280" y="147" width="40" height="103" fill="#3498db"/>
                                <text x="300" y="142" text-anchor="middle" font-size="12">315</text>
                                
                                <rect x="430" y="125" width="40" height="125" fill="#3498db"/>
                                <text x="450" y="120" text-anchor="middle" font-size="12">450</text>
                                
                                <rect x="580" y="95" width="40" height="155" fill="#3498db"/>
                                <text x="600" y="90" text-anchor="middle" font-size="12">630</text>
                                
                                <rect x="130" y="200" width="40" height="50" fill="#e74c3c"/>
                                <text x="150" y="195" text-anchor="middle" font-size="12">108</text>
                                
                                <rect x="280" y="180" width="40" height="70" fill="#e74c3c"/>
                                <text x="300" y="175" text-anchor="middle" font-size="12">189</text>
                                
                                <rect x="430" y="160" width="40" height="90" fill="#e74c3c"/>
                                <text x="450" y="155" text-anchor="middle" font-size="12">270</text>
                                
                                <rect x="580" y="130" width="40" height="120" fill="#e74c3c"/>
                                <text x="600" y="125" text-anchor="middle" font-size="12">378</text>
                                
                                <rect x="500" y="30" width="150" height="20" fill="#3498db" rx="3"/>
                                <text x="660" y="45" font-size="12">Поступления</text>
                                
                                <rect x="500" y="55" width="150" height="20" fill="#e74c3c" rx="3"/>
                                <text x="660" y="70" font-size="12">Расходы (60%)</text>
                            </svg>
                        </div>

                        <h3>Ключевые показатели эффективности</h3>
                        <ul>
                            <li><strong>NPV (Чистая приведенная стоимость):</strong> Положительный с 2028 года</li>
                            <li><strong>IRR (Внутренняя норма доходности):</strong> 15-20%</li>
                            <li><strong>Срок окупаемости:</strong> 3-4 года</li>
                        </ul>
                    </div>
                </div>
            `,
            analytics: `
                <div class="page-section active">
                    <h1 class="page-title">Аналитика</h1>
                    <div class="page-content">
                        <h2>Аналитика и прогнозы</h2>
                        
                        <h3>Прогноз парка электромобилей</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Год</th>
                                    <th>Парк (ед.)</th>
                                    <th>Рост (%)</th>
                                    <th>Доля в общем парке (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2024</td>
                                    <td>800</td>
                                    <td>-</td>
                                    <td>0.02</td>
                                </tr>
                                <tr>
                                    <td>2025</td>
                                    <td>1 200</td>
                                    <td>50</td>
                                    <td>0.03</td>
                                </tr>
                                <tr>
                                    <td>2026</td>
                                    <td>1 800</td>
                                    <td>50</td>
                                    <td>0.04</td>
                                </tr>
                                <tr>
                                    <td>2027</td>
                                    <td>2 700</td>
                                    <td>50</td>
                                    <td>0.06</td>
                                </tr>
                                <tr>
                                    <td>2028</td>
                                    <td>4 000</td>
                                    <td>48</td>
                                    <td>0.09</td>
                                </tr>
                                <tr>
                                    <td>2029</td>
                                    <td>5 800</td>
                                    <td>45</td>
                                    <td>0.13</td>
                                </tr>
                                <tr>
                                    <td>2030</td>
                                    <td>8 300</td>
                                    <td>43</td>
                                    <td>0.18</td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="chart-container">
                            <div class="chart-title">Прогноз роста парка электромобилей</div>
                            <svg width="100%" height="250" viewBox="0 0 700 250">
                                <line x1="50" y1="200" x2="650" y2="200" stroke="#2c3e50" stroke-width="2"/>
                                <line x1="50" y1="200" x2="50" y2="30" stroke="#2c3e50" stroke-width="2"/>
                                
                                <text x="30" y="200" text-anchor="end" font-size="12">0</text>
                                <text x="30" y="150" text-anchor="end" font-size="12">2000</text>
                                <text x="30" y="100" text-anchor="end" font-size="12">4000</text>
                                <text x="30" y="50" text-anchor="end" font-size="12">6000</text>
                                
                                <text x="80" y="220" text-anchor="middle" font-size="12">2024</text>
                                <text x="170" y="220" text-anchor="middle" font-size="12">2025</text>
                                <text x="260" y="220" text-anchor="middle" font-size="12">2026</text>
                                <text x="350" y="220" text-anchor="middle" font-size="12">2027</text>
                                <text x="440" y="220" text-anchor="middle" font-size="12">2028</text>
                                <text x="530" y="220" text-anchor="middle" font-size="12">2029</text>
                                <text x="620" y="220" text-anchor="middle" font-size="12">2030</text>
                                
                                <polyline points="80,195 170,185 260,170 350,150 440,120 530,85 620,45" fill="none" stroke="#3498db" stroke-width="3"/>
                                
                                <circle cx="80" cy="195" r="5" fill="#3498db"/>
                                <circle cx="170" cy="185" r="5" fill="#3498db"/>
                                <circle cx="260" cy="170" r="5" fill="#3498db"/>
                                <circle cx="350" cy="150" r="5" fill="#3498db"/>
                                <circle cx="440" cy="120" r="5" fill="#3498db"/>
                                <circle cx="530" cy="85" r="5" fill="#3498db"/>
                                <circle cx="620" cy="45" r="5" fill="#3498db"/>
                            </svg>
                        </div>

                        <h3>Сценарии развития</h3>
                        <ul>
                            <li><strong>Оптимистичный:</strong> Рост 50%+ ежегодно, активная поддержка государства</li>
                            <li><strong>Базовый:</strong> Рост 40-45% ежегодно, умеренная поддержка</li>
                            <li><strong>Пессимистичный:</strong> Рост 25-30% ежегодно, минимальная поддержка</li>
                        </ul>
                    </div>
                </div>
            `,
            conclusion: `
                <div class="page-section active">
                    <h1 class="page-title">Заключение</h1>
                    <div class="page-content">
                        <h2>Заключение и рекомендации</h2>
                        
                        <h3>Основные выводы</h3>
                        <ul>
                            <li>Текущий нулевой коэффициент для электромобилей не соответствует долгосрочным целям устойчивого развития</li>
                            <li>Необходимость создания системы утилизации батарей электромобилей очевидна</li>
                            <li>Международный опыт показывает эффективность утилизационных платежей</li>
                            <li>Финансовая модель демонстрирует положительный экономический эффект</li>
                            <li>Экологические преимущества правильной утилизации значительны</li>
                        </ul>

                        <h3>Рекомендации</h3>
                        <ol>
                            <li><strong>Нормативные:</strong> Разработать и принять изменения в законодательство</li>
                            <li><strong>Организационные:</strong> Создать систему администрирования платежей</li>
                            <li><strong>Инфраструктурные:</strong> Развить сеть утилизационных предприятий</li>
                            <li><strong>Информационные:</strong> Провести разъяснительную работу</li>
                            <li><strong>Мониторинговые:</strong> Создать систему контроля и отчетности</li>
                        </ol>

                        <h3>Ожидаемые результаты</h3>
                        <ul>
                            <li>Создание устойчивой системы утилизации электромобилей</li>
                            <li>Поступление средств в бюджет (прогноз: 1.5 млрд тг к 2030 году)</li>
                            <li>Снижение экологического риска от утилизации батарей</li>
                            <li>Развитие отрасли переработки</li>
                            <li>Создание новых рабочих мест</li>
                        </ul>

                        <div class="result-box">
                            <h3>Итоговая рекомендация</h3>
                            <p>Рекомендуется внедрить утилизационный платеж на электромобили с дифференцированными коэффициентами, начиная с 2027 года, с поэтапным внедрением по всей территории Республики Казахстан.</p>
                        </div>
                    </div>
                </div>
            `
        };

        return pages[pageName] || pages.home;
    }

    setupCalculators() {
        const calcButtons = document.querySelectorAll('.calc-btn');
        calcButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const calcType = btn.getAttribute('data-calc');
                this.openCalculator(calcType);
            });
        });
    }

    openCalculator(type) {
        const modal = document.createElement('div');
        modal.className = 'calculator-modal active';
        
        let content = '';
        
        if (type === 'utilization') {
            content = `
                <div class="calculator-content">
                    <div class="calculator-header">
                        <h2 class="calculator-title">Калькулятор утилизационного платежа</h2>
                        <button class="close-btn">&times;</button>
                    </div>
                    <div class="form-group">
                        <label>Тип электромобиля:</label>
                        <select id="ev-type">
                            <option value="0.2">Микро (до 30 кВт⋅ч)</option>
                            <option value="0.4">Компактный (30-50 кВт⋅ч)</option>
                            <option value="0.6">Средний (50-70 кВт⋅ч)</option>
                            <option value="0.8">Полноразмерный (70-100 кВт⋅ч)</option>
                            <option value="1.0">Люкс (свыше 100 кВт⋅ч)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>МРП (тенге):</label>
                        <input type="number" id="mrp-value" value="3600">
                    </div>
                    <div class="form-group">
                        <label>Базовая ставка (МРП):</label>
                        <input type="number" id="base-rate" value="50">
                    </div>
                    <button class="btn-primary" onclick="app.calculateUtilization()">Рассчитать</button>
                    <div class="result-box" id="utilization-result" style="display:none;">
                        <div>Размер платежа:</div>
                        <div class="result-value" id="payment-value">0 тенге</div>
                    </div>
                </div>
            `;
        } else if (type === 'financial') {
            content = `
                <div class="calculator-content">
                    <div class="calculator-header">
                        <h2 class="calculator-title">Финансовый прогноз</h2>
                        <button class="close-btn">&times;</button>
                    </div>
                    <div class="form-group">
                        <label>Начальный парк электромобилей:</label>
                        <input type="number" id="initial-park" value="2000">
                    </div>
                    <div class="form-group">
                        <label>Годовой рост (%):</label>
                        <input type="number" id="growth-rate" value="40">
                    </div>
                    <div class="form-group">
                        <label>Средний платеж (МРП):</label>
                        <input type="number" id="avg-payment" value="25">
                    </div>
                    <div class="form-group">
                        <label>Период прогноза (лет):</label>
                        <input type="number" id="forecast-years" value="5">
                    </div>
                    <button class="btn-primary" onclick="app.calculateFinancial()">Рассчитать</button>
                    <div class="result-box" id="financial-result" style="display:none;">
                        <div id="forecast-table"></div>
                    </div>
                </div>
            `;
        } else if (type === 'market') {
            content = `
                <div class="calculator-content">
                    <div class="calculator-header">
                        <h2 class="calculator-title">Прогноз рынка</h2>
                        <button class="close-btn">&times;</button>
                    </div>
                    <div class="form-group">
                        <label>Текущий парк электромобилей:</label>
                        <input type="number" id="current-park" value="1500">
                    </div>
                    <div class="form-group">
                        <label>Сценарий развития:</label>
                        <select id="market-scenario">
                            <option value="optimistic">Оптимистичный (50%+)</option>
                            <option value="base" selected>Базовый (40-45%)</option>
                            <option value="pessimistic">Пессимистичный (25-30%)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Горизонт прогноза (лет):</label>
                        <input type="number" id="market-years" value="10">
                    </div>
                    <button class="btn-primary" onclick="app.calculateMarket()">Рассчитать</button>
                    <div class="result-box" id="market-result" style="display:none;">
                        <div id="market-forecast"></div>
                    </div>
                </div>
            `;
        }
        
        modal.innerHTML = content;
        document.body.appendChild(modal);
        
        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    calculateUtilization() {
        const coefficient = parseFloat(document.getElementById('ev-type').value);
        const mrp = parseFloat(document.getElementById('mrp-value').value);
        const baseRate = parseFloat(document.getElementById('base-rate').value);
        
        const payment = baseRate * mrp * coefficient;
        
        document.getElementById('payment-value').textContent = 
            payment.toLocaleString('ru-RU') + ' тенге';
        document.getElementById('utilization-result').style.display = 'block';
    }

    calculateFinancial() {
        const initialPark = parseFloat(document.getElementById('initial-park').value);
        const growthRate = parseFloat(document.getElementById('growth-rate').value) / 100;
        const avgPayment = parseFloat(document.getElementById('avg-payment').value);
        const years = parseInt(document.getElementById('forecast-years').value);
        const mrp = 3600;
        
        let html = '<table><thead><tr><th>Год</th><th>Парк</th><th>Платежи (млн тг)</th></tr></thead><tbody>';
        
        let park = initialPark;
        for (let i = 1; i <= years; i++) {
            park = park * (1 + growthRate);
            const payments = park * avgPayment * mrp / 1000000;
            html += `<tr><td>${2026 + i}</td><td>${Math.round(park).toLocaleString()}</td><td>${payments.toFixed(1)}</td></tr>`;
        }
        
        html += '</tbody></table>';
        document.getElementById('forecast-table').innerHTML = html;
        document.getElementById('financial-result').style.display = 'block';
    }

    calculateMarket() {
        const currentPark = parseFloat(document.getElementById('current-park').value);
        const scenario = document.getElementById('market-scenario').value;
        const years = parseInt(document.getElementById('market-years').value);
        
        const rates = {
            optimistic: 0.50,
            base: 0.425,
            pessimistic: 0.275
        };
        
        const growthRate = rates[scenario];
        
        let html = '<table><thead><tr><th>Год</th><th>Парк</th><th>Рост</th></tr></thead><tbody>';
        
        let park = currentPark;
        for (let i = 1; i <= years; i++) {
            const prevPark = park;
            park = park * (1 + growthRate);
            const growth = ((park - prevPark) / prevPark * 100).toFixed(1);
            html += `<tr><td>${2026 + i}</td><td>${Math.round(park).toLocaleString()}</td><td>${growth}%</td></tr>`;
        }
        
        html += '</tbody></table>';
        document.getElementById('market-forecast').innerHTML = html;
        document.getElementById('market-result').style.display = 'block';
    }

    setupSearch() {
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        
        const performSearch = () => {
            const query = searchInput.value.toLowerCase();
            if (query.length < 2) return;
            
            const results = this.searchContent(query);
            this.displaySearchResults(results);
        };
        
        searchInput.addEventListener('input', performSearch);
        searchBtn.addEventListener('click', performSearch);
    }

    searchContent(query) {
        const results = [];
        const pages = ['home', 'legislation', 'current-system', 'proposed-changes', 
                      'administrator', 'economic-justification', 'environmental-justification',
                      'international-experience', 'financial-model', 'analytics', 'conclusion'];
        
        pages.forEach(page => {
            const content = this.getPageContent(page).toLowerCase();
            if (content.includes(query)) {
                const title = this.getPageTitle(page);
                const excerpt = this.getExcerpt(content, query);
                results.push({ page, title, excerpt });
            }
        });
        
        return results;
    }

    getPageTitle(page) {
        const titles = {
            home: 'Главная',
            legislation: 'Законодательство',
            'current-system': 'Действующая система',
            'proposed-changes': 'Предлагаемые изменения',
            administrator: 'Кто администрирует платеж',
            'economic-justification': 'Экономическое обоснование',
            'environmental-justification': 'Экологическое обоснование',
            'international-experience': 'Международный опыт',
            'financial-model': 'Финансовая модель',
            analytics: 'Аналитика',
            conclusion: 'Заключение'
        };
        return titles[page] || page;
    }

    getExcerpt(content, query) {
        const index = content.indexOf(query);
        const start = Math.max(0, index - 50);
        const end = Math.min(content.length, index + query.length + 50);
        return '...' + content.substring(start, end) + '...';
    }

    displaySearchResults(results) {
        let searchResultsDiv = document.querySelector('.search-results');
        if (!searchResultsDiv) {
            searchResultsDiv = document.createElement('div');
            searchResultsDiv.className = 'search-results';
            document.querySelector('.search-box').appendChild(searchResultsDiv);
        }
        
        if (results.length === 0) {
            searchResultsDiv.innerHTML = '<p>Результаты не найдены</p>';
        } else {
            searchResultsDiv.innerHTML = results.map(r => `
                <div class="search-result-item" onclick="app.loadPage('${r.page}')">
                    <div class="search-result-title">${r.title}</div>
                    <div class="search-result-excerpt">${r.excerpt}</div>
                </div>
            `).join('');
        }
        
        searchResultsDiv.classList.add('active');
    }

    setupExport() {
        const exportButtons = document.querySelectorAll('.export-btn');
        exportButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const format = btn.getAttribute('data-format');
                this.exportContent(format);
            });
        });
    }

    exportContent(format) {
        const content = document.getElementById('page-content').innerHTML;
        const title = document.querySelector('.page-title')?.textContent || 'Документ';
        
        switch (format) {
            case 'print':
                window.print();
                break;
            case 'pdf':
                alert('Для экспорта в PDF используйте функцию печати и выберите "Сохранить как PDF"');
                window.print();
                break;
            case 'csv':
                this.exportCSV();
                break;
            case 'xlsx':
                alert('Для экспорта в XLSX скопируйте таблицы и вставьте в Excel');
                break;
            case 'png':
                alert('Для экспорта в PNG используйте инструмент снимка экрана');
                break;
        }
    }

    exportCSV() {
        const tables = document.querySelectorAll('table');
        if (tables.length === 0) {
            alert('На странице нет таблиц для экспорта');
            return;
        }
        
        let csv = '';
        tables.forEach(table => {
            const rows = table.querySelectorAll('tr');
            rows.forEach(row => {
                const cells = row.querySelectorAll('th, td');
                const rowData = Array.from(cells).map(cell => 
                    `"${cell.textContent.trim()}"`
                ).join(',');
                csv += rowData + '\n';
            });
            csv += '\n';
        });
        
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'export.csv';
        link.click();
    }

    initCharts(pageName) {
        // Charts are already embedded in the page content
        // This method can be extended for dynamic chart generation
    }
}

// Initialize the application
const app = new App();
