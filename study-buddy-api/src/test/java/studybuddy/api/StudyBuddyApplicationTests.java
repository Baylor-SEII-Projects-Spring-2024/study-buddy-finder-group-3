package studybuddy.api;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("testdb")  // make these tests use the H2 in-memory DB instead of your actual DB
class StudyBuddyApplicationTests {
	@Test
	void emptyTest() {
	}

	@Test
	void exampleTest() {
		assertEquals(2, 1 + 1);
	}
}
