// vendor
import React, {  Component  } from 'react';
import Modal from 'react-modal';

// own
import Styles from './styles.module.css';
import StylesList from '../../styles/css/styles.list.css';

import Icon from '../../styles/images/icons/rules.svg';

Modal.setAppElement('#root');

const appUrl = process.env.REACT_APP_EVENT_LINK;
const orgName = process.env.REACT_APP_EVENT_ORG_NAME;
const orgNameShort = process.env.REACT_APP_EVENT_ORG_NAME_SHORT;
const orgAddress = process.env.REACT_APP_EVENT_ORG_ADDRESS;
const eventName = process.env.REACT_APP_EVENT_NAME;

const privacyRulesUrl = appUrl + '/privacyRules';
const privacyPolicyUrl = appUrl + '/privacyPolicy';

export class PrivacyPolicyModal extends Component {
    render() {
        const {  isOpen, setVisible, action  } = this.props;

        return (
            <Modal
                isOpen={ isOpen }
                contentLabel='Політика конфіденційності'
                className={ Styles.modalContent }
                overlayClassName={ Styles.modalOverlay }
                onRequestClose={ () => setVisible(false) }
            >
                <div className={ Styles.privacyModalContainer }>
                    <div className='container'>
                        <div className='content'>
                            <div className='subTitle'>ЗГОДА ВІДВІДУВАЧА САЙТУ НА ОБРОБКУ ПЕРСОНАЛЬНИХ ДАНИХ</div>
                            <ol>
                                <li>
                                    Цим надаю свою добровільну, конкретну,
                                    інформовану і свідому згоду ТОВ "{ orgName }"
                                    (юридична та поштова адреса: { orgAddress })(далі – «Компанія»)
                                    на обробку моїх наступних персональних даних, що збираються через сайт
                                    &nbsp;
                                    <a href={ appUrl }>
                                        { appUrl }
                                    </a>
                                    &nbsp;
                                    (далі – «Сайт») або іншим чином передаються
                                    мною Компанії:
                                    <ol>
                                        <li>
                                            Нікнейм (прізвище, ім'я), адреса електронної
                                            пошти, аватар (фотографію), що зазначені
                                            мною при реєстрації на сайті
                                            Login.telescopeAi.com (створення облікового
                                            запису), а також персональні дані, зібрані
                                            автоматично з мого профілю в соціальної
                                            мережі/у ресурсу в мережі «Інтернет»
                                            (Facebook, LinkedIn, Twitter, аккаунт
                                            Google, GitHub і т. д.), з використанням
                                            якої / -ого мною здійснюється вхід через
                                            Login.telescopeAi.com на Сайт, в тому числі
                                            нікнейм (прізвище, ім'я), аватар
                                            (фотографія), адреса електронної пошти з
                                            соціальної мережі/ ресурсу в мережі
                                            «Інтернет», мережевий ідентифікатор (ID)
                                            мого профілю в соціальній мережі/ ресурсі в
                                            мережі «Інтернет», мій мережевий
                                            ідентифікатор (ID) на Сайте та інші надані
                                            ідентифікатори (ID), автоматично визначуване
                                            на підставі використовуваного IP-адреси
                                            місце знаходження (країна), а також
                                            персональні дані, зазначені мною у
                                            створюваному мною на Сайті профілі,
                                            включаючи громадянство (в разі зазначення),
                                            прізвище, ім'я, по батькові, контактний
                                            телефон, відомості про освіту (найменування
                                            навчального закладу, напрямок/спеціальність,
                                            курс, форма навчання, отримана
                                            кваліфікація), відомості про наявний досвід
                                            роботи / діяльності, в тому числі щодо
                                            займаних посад, виконуваних робіт, надаваних
                                            послуг, наявних уміннях і навичках
                                            (включаючи технології програмування, мови
                                            програмування і т.д.), рівень володіння
                                            іноземними мовами, бажаний вид і характер
                                            співпраці з Компанією або юридичними особами
                                            групи компаній { orgNameShort } (в тому числі
                                            передбачувані види діяльності, виконувані
                                            роботи, надані послуги в рамках планованих
                                            до укладання цивільно-правових договорів,
                                            строки і порядок виконання робіт, надання
                                            послуг, розмір винагороди і т. д.), бажаний
                                            час для зворотного зв'язку зі мною,
                                            посилання на акаунти в соціальних мережах,
                                            відомості з супровідного листа, дані
                                            паспорту громадянина України та
                                            реєстраційний номер облікової картки
                                            платника податків з Державного реєстру
                                            фізичних осіб-платників податків (включаючи
                                            їх копії), зображення у вигляді фотографій
                                            чи аудіо-, відеозаписів, інтерв'ю, інші
                                            відомості, зібрані в автоматичному режимі
                                            (IP-адреси пристроїв, з допомогою яких
                                            відвідується Сайт, тип пристрою, дата і час
                                            відвідування Сайту, поновлення та видалення
                                            або знищення даних, відомості про дії на
                                            Сайті, файли «cookies»), в т.ч. з
                                            використанням метричних програм (систем)
                                            Яндекс.Метрика, Google Analytics, Google Tag
                                            Manager, Google reCAPTCHA, J2SE/J2EE,
                                            провайдерів авторизації
                                            LinkedIn, Facebook, аккаунта Google,
                                            Twitter, Github та інших.
                                        </li>
                                        <li>
                                            Відповідно до умов обробки, викладених у
                                            Політиці конфіденційності персональних даних
                                            Відвідувачів Сайту (далі – «Політика»), а
                                            також відповідно до умов, передбачених
                                            правилами конкурсу «{ eventName }»
                                            (далі – «Конкурс»), організованого Компанією
                                            (далі – «Правила конкурсу»).
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    Ця згода дається на вчинення наступних дій
                                    (операцій) або сукупності дій (операцій):
                                    збирання, реєстрація, накопичення,
                                    зберігання, адаптування, зміна, поновлення,
                                    використання і поширення (розповсюдження,
                                    реалізація, передача), включаючи передачу
                                    юридичним особам в рамках групи компаній
                                    { orgNameShort } (в тому числі іноземним суб'єктам
                                    відносин, пов'язаних з персональними даними,
                                    знеособлення, знищення персональних даних, в
                                    тому числі з використанням інформаційних
                                    (автоматизованих) систем, включаючи шляхом
                                    внесення в інформаційні системи персональних
                                    даних Компанії.
                                </li>
                                <li>
                                    Обробка моїх персональних даних на підставі
                                    цієї згоди може здійснюватися Компанією з
                                    метою:
                                    <ol>
                                        <li>
                                            Надання мені можливості входу на Сайт і
                                            доступу до ресурсів Сайту;
                                        </li>
                                        <li>
                                            Організації та проведення Конкурсу;
                                        </li>
                                        <li>
                                            Отримання мною, якщо я є учасником
                                            Конкурсу, призу в разі його присудження;
                                        </li>
                                        <li>
                                            Розгляд питання про укладення зі мною
                                            трудового або цивільно-правового договору;
                                        </li>
                                        <li>
                                            Встановлення зі мною зворотного зв'язку (в
                                            тому числі направлення мені листів) для
                                            зазначених вище цілей (в тому числі
                                            уточнення моїх персональних даних і
                                            направлення мені пропозицій про укладення
                                            трудового або цивільно-правового договору,
                                            розсилок, особиста комунікація з боку
                                            Компанії) і повідомлення мені про внесені
                                            зміни в Політику щодо цілей обробки, складу
                                            оброблюваних персональних даних і третіх
                                            осіб, яким мої персональні дані можуть
                                            передаватися / бути доступні, або про
                                            внесені зміни в Правила конкурсу;
                                        </li>
                                        <li>
                                            Рекламна/маркетингова мета, включаючи
                                            проведення промоції Конкурсу, направлення
                                            мені новин про заходи, що проводяться
                                            Компанією, і запрошень на такі заходи,
                                            таргетованої реклами в пошукових мережах і
                                            соціальних мережах;{ ' ' }
                                        </li>
                                        <li>
                                            Занесення моїх персональних даних в
                                            інформаційні системи персональних даних
                                            Компанії для формування кадрового резерву
                                            або бази потенційних контрагентів в рамках
                                            групи компаній { orgNameShort } з метою розгляду питання
                                            про укладення цивільно-правового договору
                                            між мною і юридичною особою з групи компаній
                                            { orgNameShort };
                                        </li>
                                        <li>
                                            Здійснення взаємодії (обмін інформацією)
                                            між Сайтом і ресурсом telescope.epam.com,
                                            який проводить аналіз і угруповання даних
                                            для Компанії;
                                        </li>
                                        <li>
                                            Уточнення, підтвердження достовірності та
                                            повноти персональних даних, наданих мною;
                                        </li>
                                        <li>
                                            Виконання повноважень та обов'язків,
                                            покладених на Компанію чинним
                                            законодавством;
                                        </li>
                                        <li>
                                            Файли «cookies» обробляються з метою
                                            поліпшення роботи Сайту, підвищення
                                            зручності та ефективності моєї роботи з
                                            Сайтом, надання рішень та послуг, які
                                            найбільш відповідають моїм потребам,
                                            визначення моїх переваг, відображення
                                            рекламних оголошень (поведінкової реклами),
                                            а також для забезпечення технічної
                                            можливості функціонування Сайту. Я
                                            згоден(на) з обробкою даних файлів з метою,
                                            докладно описаної у розділі 6 Політики, з
                                            яким я ознайомився(лася).
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    Я розумію, що Компанія є юридичною особою,
                                    яка входить до міжнародної групи компаній
                                    { orgNameShort }, а Сайт використовується всіма
                                    юридичними особами з даної групи компаній, в
                                    зв'язку з чим я даю свою згоду на
                                    транскордонну передачу та надання доступу до
                                    моїх персональних даних, зібраних через
                                    Сайт, всім юридичним особам, що входять в
                                    дану групу, і використання моїх персональних
                                    даних цими юридичними особами виключно з
                                    метою, зазначеної у цієї згоді на обробку
                                    персональних даних.
                                </li>
                                <li>
                                    Ця згода діє з моменту її надання і протягом
                                    всього періоду використання мною Сайту, моєї
                                    участі в Конкурсі, а також протягом всього
                                    терміну розгляду Компанією питання про
                                    співробітництво зі мною до моменту
                                    відкликання цієї згоди. Протягом даного
                                    терміну Компанія, інші зазначені в Політиці
                                    особи вправі обробляти, в тому числі
                                    зберігати, мої персональні дані, зазначені в
                                    цієї згоді.
                                </li>
                                <li>
                                    Мені відомо, що ця згода в будь-який момент
                                    може бути відкликана мною за допомогою
                                    направлення в Компанію відповідної вимоги в
                                    порядку, встановленому Політикою.
                                </li>
                                <li>
                                    У разі відкликання згоди на обробку
                                    персональних даних я проінформований(а) про
                                    необхідність припинити використання Сайту
                                    або, в разі відкликання згоди тільки щодо
                                    обробки файлів «cookies», відключити файли
                                    «cookies» в налаштуваннях мого браузера.
                                </li>
                                <li>
                                    Місцезнаходження моїх персональних даних
                                    (фактична адреса обробки персональних
                                    даних): { orgAddress }.
                                </li>
                                <li>
                                    Права суб'єкта:
                                    <ol>
                                        <li>
                                            Я до моменту надання цієї згоди ознайомлений
                                            зі своїми правами, передбаченими чинним
                                            законодавством, а саме:
                                            <ol>
                                                <li>
                                                    Знати про джерела збирання,
                                                    місцезнаходження своїх персональних даних,
                                                    мету їх обробки, місцезнаходження та / або
                                                    місце проживання (перебування) володільця чи
                                                    розпорядника персональних даних або дати
                                                    відповідне доручення щодо отримання цієї
                                                    інформації уповноваженим мною особам, крім
                                                    випадків, встановлених чинним
                                                    законодавством;
                                                </li>
                                                <li>
                                                    Отримувати інформацію про умови надання
                                                    доступу до персональних даних, зокрема
                                                    інформацію про третіх осіб, яким передаються
                                                    мої персональні дані;
                                                </li>
                                                <li>
                                                    На доступ до своїх персональних даних;
                                                </li>
                                                <li>
                                                    Отримувати не пізніше як за 30 календарних
                                                    днів з дня надходження запиту, крім
                                                    випадків, передбачених чинним
                                                    законодавством, відповідь про те, чи
                                                    обробляються мої персональні дані, а також
                                                    отримувати зміст таких персональних даних;
                                                </li>
                                                <li>
                                                    Пред’являти володільцю персональних даних
                                                    вмотивовану вимогу із запереченням проти
                                                    обробки своїх персональних даних;
                                                </li>
                                                <li>
                                                    Пред’являти вмотивовану вимогу щодо зміни
                                                    або знищення своїх персональних даних
                                                    будь-яким володільцем та розпорядником
                                                    персональних даних, якщо ці дані
                                                    обробляються незаконно чи є недостовірними;
                                                </li>
                                                <li>
                                                    На захист своїх персональних даних від
                                                    незаконної обробки та випадкових втрат,
                                                    знищення, пошкодження у зв’язку з умисним
                                                    приховуванням, ненаданням або несвоєчасним
                                                    їх наданням, а також на захист від надання
                                                    відомостей, що є недостовірними чи ганьблять
                                                    честь, гідність та ділову репутацію фізичної
                                                    особи;
                                                </li>
                                                <li>
                                                    Звертатися із скаргами на обробку своїх
                                                    персональних даних до уповноважених органів
                                                    державної влади та посадових осіб або до
                                                    суду;
                                                </li>
                                                <li>
                                                    Застосовувати засоби правового захисту у
                                                    разі порушення законодавства про захист
                                                    персональних даних;
                                                </li>
                                                <li>
                                                    Вносити застереження стосовно обмеження
                                                    права на обробку своїх персональних даних
                                                    під час надання згоди;
                                                </li>
                                                <li>
                                                    Відкликати згоду на обробку персональних
                                                    даних;
                                                </li>
                                                <li>
                                                    Знати механізм автоматичної обробки
                                                    персональних даних;
                                                </li>
                                                <li>
                                                    На захист від автоматизованого рішення,
                                                    яке має для мені правові наслідки.
                                                </li>
                                            </ol>
                                        </li>
                                        <li>
                                            Цим я також підтверджую, що до надання даної
                                            згоди (в момент збору персональних даних) я
                                            ознайомлений з:
                                            <ol>
                                                <li>
                                                    Політикою конфіденційності персональних
                                                    даних Відвідувачів Сайту (
                                                    <a href={ privacyPolicyUrl } rel='noopener noreferrer' target='_blank'>
                                                        { privacyPolicyUrl }<img src={ Icon } alt='Політика Конкурсу' />
                                                    </a>
                                                    ), та Правилами конкурсу (
                                                    <a href={ privacyRulesUrl } rel='noopener noreferrer' target='_blank'>
                                                       { privacyRulesUrl }<img src={ Icon } alt='Правила Конкурсу' />
                                                    </a>
                                                    );
                                                </li>
                                                <li>
                                                    Правами, наданими мені відповідно до
                                                    чинного законодавства про персональні дані;
                                                </li>
                                                <li>
                                                    Iнформацією про джерела збирання,
                                                    місцезнаходження своїх персональних даних,
                                                    місцезнаходження або місце проживання
                                                    володільця та розпорядників персональних
                                                    даних, склад та зміст зібраних персональних
                                                    даних, мету збору та обробки моїх
                                                    персональних даних та осіб, яким передаються
                                                    персональні дані, мети і підстави такої
                                                    передачі, які дії з персональними даними
                                                    передбачає їх обробка, термін зберігання,
                                                    умови відкликання згоди, а також з іншою
                                                    інформацією в простій та зрозумілій формі,
                                                    що дозволяє мені дати інформовану,
                                                    добровільну та свідому згоду на обробку моїх
                                                    персональних даних.
                                                </li>
                                            </ol>
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    Я підтверджую, що в разі надання Сайту з
                                    мого боку персональних даних (включаючи
                                    прізвище, ім'я, адреса електронної пошти,
                                    мережевий ідентифікатор (ID) профілю в
                                    соціальній мережі / ресурсі в мережі
                                    «Інтернет») незареєстрованих на Сайті осіб,
                                    мною попередньо отримана згода таких осіб на
                                    обробку їх персональних даних Компанією
                                    відповідно до цілей і умов, зазначених в
                                    Політиці.
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className={ Styles.privacyFooter }>
                        <div className={ Styles.buttonsPanel }>
                            <button
                                className={ Styles.agree }
                                onClick={ () => {
                                    action(true);
                                    setVisible(false);
                                } }
                            >
                                Погоджуюсь
                            </button>
                            <div className={ Styles.emptyBlock } />
                            <button
                                className={ Styles.disagree }
                                onClick={ () => {
                                    action(false);
                                    setVisible(false);
                                } }
                            >
                                Не згоден
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
