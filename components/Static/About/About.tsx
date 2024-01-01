import classes from '../static.module.scss';

const About = () => {
    return (
        <div className={classes.container}>
            <h2 className={classes.title}>
                عن "تربتي"
            </h2>

            <p className={classes.paragraph}>
                تطبيق "تربتي" هو تطبيق متخصص في مجال الترفيه والسياحة في المملكة العربية السعودية. يهدف التطبيق إلى توفير اقتراحات ممتعة ومثيرة للأماكن الترفيهية والسياحية داخل المملكة. يمكنك استكشاف مجموعة متنوعة من الأماكن التي توفر تجارب فريدة وممتعة للمستخدمين.<br />

                بالإضافة إلى ذلك، يوفر تطبيق "تربتي" خصومات حصرية وكبيرة داخل الاماكن الترفيهية  الترفيهية والسياحية. يمكنك الاستفادة من هذه الخصومات لتوفير المال والحصول على تجارب رائعة بأسعار مخفضة.<br />

                والأمر المثير للاهتمام هو أن تطبيق "تربتي" يستخدم الذكاء الصناعي لتصميم طلعتك الترفيهية. يمكنك إدخال تفضيلاتك واهتماماتك والتطبيق سيقوم بتحليلها وتقديم اقتراحات مخصصة لأماكن الترفيه والسياحة التي تناسب ذوقك واحتياجاتك.<br />

                باستخدام تطبيق "تربتي"، يمكنك استكشاف العديد من الوجهات الممتعة في المملكة العربية السعودية والاستمتاع بتجارب فريدة وممتعة.
            </p>

            <div className={classes.instructions}>
                <p className={classes.paragraph}>
                    إذا كان لديك أي أسئلة أو استفسارات حول سياسة الاستخدام لدينا، يرجى الاتصال بنا على info@tripty.app
                </p>

                <p className={classes.paragraph}>
                    شكرًا لاستخدامك "تربتي". نأمل أن يكون التطبيق مفيدًا لك في رحلتك وطلعتك .
                </p>
            </div>
        </div>
    )
}

export default About;