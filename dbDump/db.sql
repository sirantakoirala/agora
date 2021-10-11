


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `notes`
--

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--



--
-- Dumping data for table `uploads`
--



-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(8) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
 
);

--
-- Dumping data for table `users`
--
INSERT INTO `users`(`id`, `username`, `email`, `password`, `role`) VALUES (DEFAULT, "rijan","r@gmail.com","1234567","student")

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `uploads`
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;




CREATE TABLE `topics` (
`topic_id` INT(8) NOT NULL AUTO_INCREMENT,
`topic_subject` VARCHAR(255) NOT NULL,
`topic_date` DATETIME NOT NULL,
-- `topic_cat`  INT(8) NOT NULL,
`topic_by` INT(8) NOT NULL,
 PRIMARY KEY (`topic_id`)
);


ALTER TABLE `topics` ADD FOREIGN KEY(`topic_by`) REFERENCES users(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;


CREATE TABLE `posts` (
`post_id` INT(8) NOT NULL AUTO_INCREMENT,
`post_content` TEXT NOT NULL,
`post_date` DATETIME NOT NULL,
`post_topic` INT(8) NOT NULL,
`post_by` INT(8) NOT NULL,
PRIMARY KEY (`post_id`)
) ;


ALTER TABLE `posts` ADD FOREIGN KEY(`post_topic`) REFERENCES topics(`topic_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `posts` ADD FOREIGN KEY(`post_by`) REFERENCES users(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
--
-- Indexes for table `users`
--
;