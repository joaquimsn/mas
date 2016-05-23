var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

module.exports = {
  name:              {type: String, required: true, default: ''},
  amountOfSection:   {type: Number, required: true, default: ''},
    sections:        {type: Array, required: true,  default: '[]'}
};

// {
//     "name": "Preparação para o ENEM",
//     "path": "preparacao-para-o-enem",
//     "pageImageBanner": "categories/for-student-banner.jpg",
//     "price": "21500",
//     "bannerBackgroundColor": "#444",
//     "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa nesciunt totam excepturi aliquam aut quas assumenda pariatur! Obcaecati laudantium sunt quasi molestiae odio ducimus, ipsam laboriosam est ea magnam consequuntur porro magni aperiam aliquam sequi in dicta atque amet sint voluptatum delectus quam perspiciatis, debitis blanditiis vel. Reiciendis ducimus laborum possimus porro cum deserunt dolorem, placeat ipsa ea beatae quod non esse alias magni ex facere adipisci reprehenderit dicta laboriosam atque expedita mollitia. At odit soluta quos odio necessitatibus ad rem nostrum eos! Enim ducimus cupiditate facilis quam molestiae dolore est veniam quidem. Ea porro ipsam fugit sapiente, aliquam dolores, officiis, dignissimos laboriosam aut vel odio veritatis consequatur soluta. Voluptate, facere aperiam ad odit dolor velit accusamus iusto, nulla qui perspiciatis id magni ex tempore dignissimos voluptatem ea quam totam alias similique, quisquam quibusdam? Eius dicta doloribus repellat aliquam, ea tenetur distinctio dolore similique delectus. Voluptas temporibus, tempora tempore beatae provident eaque soluta consequuntur nesciunt tenetur expedita sint vel culpa laboriosam labore vitae quo fugiat quisquam, placeat modi atque porro? Quis dignissimos nisi praesentium porro nemo. Iste explicabo atque saepe fuga nostrum optio nam quisquam corrupti dignissimos magnam nobis doloribus velit quas reprehenderit perferendis nemo quibusdam, adipisci blanditiis natus at laborum enim facilis ea deleniti amet. Accusantium iure accusamus non, aperiam eum. Ipsa eligendi quo natus maxime tempora distinctio, et ex repudiandae amet accusamus quae sit iste nam voluptatum ipsum, nisi adipisci, ut alias laboriosam. Quibusdam dolorem numquam ipsum ad blanditiis quas quaerat eos nam, cupiditate eveniet, praesentium debitis omnis a nisi exercitationem inventore.",
//     "category": "56eb22057d7aa59f308d7df2",
//     "class": "56eb08f89225d8ce2919b2d6"
// }