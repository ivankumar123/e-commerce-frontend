import { it, expect, describe } from "vitest";
import { Amount } from "./money";

describe('Format money' , () => {
it('format 1999 to $19.99', () => {
expect(Amount(1999)).toBe("$19.99");
});

it(' To check two decimal', () => {
    expect(Amount(1090)).toBe("$10.90");
    expect(Amount(100)).toBe("$1.00");
});
    
})
